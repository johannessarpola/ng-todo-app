# Angular multi-module project

## Preface

Angular has a support for structuring multiple projects under a single root project. This can be used to create libraries which helps with isolation and reusing of the code. 
It has been greatly improved with the Angula 6 and onwards. There are still some a bit more bizarre errors but generally it works well out of the box. 



## Libraries and why to use them

Libraries are built separately and contain `public-api.ts` definition which contain the public API surface for the functionality. Often they're built into `/dist/` folder and for local development they're linked with paths with `tsconfig.json`. Libraries can the be referenced from the application code for example in components with following way `import { Todo, TodoApiService } from 'todo-api';`. Due note that it should be `todo-api` and nothing else even though some IDEs
like VsCode try to suggest using paths like `projects/todo-api/src/lib/todo-api.service` which will not work. Idea is that library is used from the code like any other package dependency, which are libraries. 

Most common use cases for libraries inside your projects are 
- Reusable component library
- Shared service functionality, e.g abstraction of API or external data source

It can be retrofitted with older projects as well which might benefit of reducint the duplication of the codebase by separating the code into reusable libraries. Given the current development workflow
with `ng` command line utility it might not be the first thing to do as libraries need to be built separately or it might be a bug with latest version on Windows at least as if you're running `ng serve` with
`ng build <library> --prod --watch` the whole thing breaks up with hot reloading both modules.

But since it is so easy to separate functionality into a separate library later in the development it might be beneficial to start developing libraries after code has stabilized a bit or when other
projects require copy-pasting code.

If a organization has a own npm registry these libraries can be published there and used like any other package from npm repository, of course they could be public as well but in most cases its not relevant with proprietary solutions for customers.

In a perfect world they should encourage more code reusability and allow for maintaining different versions of APIs with ease for example since the dependencies can be versioned for specific to specific ones like other NPM packages. They could help with copy-pasting code between different projects as well.

Pros:
- Encourages reusability
- Encourages modular design
- Can version to a specific version
- Might make programming easier to parallelize between teams and people.
- Allows for [monorepo](https://en.wikipedia.org/wiki/Monorepo) development as it might be simpler than having multiple repositories for all microservices for example.

Cons
- Development workflow is not as streamlined as developing everything under single application. Mainly
because at the moment the tools at least on Windows do not work that well together. (Will be expanded later)
- Might increase complexity when versioning is introduced.
- [monorepo](https://en.wikipedia.org/wiki/Monorepo) development (?)

## How-to

The basic workflow is similar to other Angular projects and it is assumed that you have `ng` command line utility installed. 

First workspace is created with `ng new <workspace-name> --create-application=false` which creates the empty project structure with `package.json` base for Angular projects. After `cd <workspace-name>` its possible to use the `ng generate library <library-name>` to create the first library. 

Then to create the application with `ng generate application <application-name>`  so library can be used from there.

Now the folder structure follow this kind of pattern

```
+-- node_modules
+-- projects
+-- +-- <library-name>
|   |   +-- src 
|   |   +-- package.json
|   |   +-- tsconfig.lib.json
|   +-- <application-name>
|   |   +-- src
|   |   +-- tsconfig.app.json
+-- package.json
+-- angular.json
```

Now after calling `ng build <library-name>` there should be `dist` folder in the root of workspace and insde there should be sub-folder with the library's name. This contains the compiled code which is then linked with workspaces `tsconfig.json` so that for example IDE's recognize it.

If you open the `tsconfig.json` there should be generated paths 
```json
"paths": {
    "<library-name>": [
        "dist/<library-name>/<library-name>",
        "dist/<library-name>"
    ],
}
```

On top of that with VsCode some warnings can be get rid of with following addition.

```json
"paths": {
    ...
    "<library-name>/*": [
        "dist/<library-name>/*"
    ]
}
```

### Component library

When libary is created for the use of a common component library its worth to note that since with Angular components are prefixed there is option for `ng generate library --prefix` to define a custom one. If no such is defined it by default uses value `lib` e.g. `<lib-component></lib-component>` where as default components inside AppModule are called `<app-component></app-component>`. These need to be defined in the library's module exports like so for example:

```ts
@NgModule({
  declarations: [MylibComponent],
  imports: [
  ],
  exports: [MylibComponent]
})
```

Prefixes are also defined in the components own definition with the selector attribute so if you were to retroactively change it it would need to be manually changed there as well and it is added automatically when `ng generate` is used to generate components into library with option `--project=<library-name>`. 

```
@Component({
  selector: 'lib-mylib',
  template: `
    <p>
      mylib works!
    </p>
  `,
  styles: [
  ]
})
```



## Library gotchas

At some points IntelliSense did not work with library and VsCode its possible to try to build the library with `--prod` flag and it seemed to fix it.


Angular creates the library service templates with following annotation:
```ts
    @Injectable({
      providedIn: 'root'
    })
```
and at it seems to cause a bizarre error 
```
ERROR: Internal error: unknown identifier []
An unhandled exception occurred: Internal error: unknown identifier []
```
when building. I could not find a reason for it and everything seemed to work fine when it was removed when doing a service based library for example.
