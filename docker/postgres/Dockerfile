FROM postgres:12

# Install PG Crypto to provide native support for passwords
COPY scripts/ /docker-entrypoint-initdb.d/ 

# Initialization SQL scripts should be in init_db folder
ADD init_db /docker-entrypoint-initdb.d/
