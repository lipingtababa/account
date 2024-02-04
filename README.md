# credit
Backend of a business credit service

# Assumptions
1. A user can be associated with multiple business accounts, and the same is true in reverse.
2. A business account might have multiple cards.
3. We don't need strong consistency here since it doesn't handle business transactions.

# TODO
- Add a health-check endpoint.
- Run db operations and S3 presigned-url operation in parallel in overview.
- Refine IAM policies to apply least-priviledges-principle.
- Use flyaway or liquibase to integrate DB management into the CI/CD pipeline. At this moment, tables are created manually.
- Add customized security groups for containers and DBs.
- The infrastructure should be split into 3 parts: the foundation(ECR, cluster), the service, the dependencies(DB, S3)
