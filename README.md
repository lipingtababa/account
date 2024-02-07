# Scenario
The scenario is as follows:
1. Qred’s developers are required to build new APIs consistently to achieve specific business objectives.
2. The technical competence to specify and support the building of these APIs is currently a scarce resource, which slows the company down.
3. The mobile view shown in Appendix 1 is a frontend-view which lacks an API solution on the backend.
4. The API definition and implementation can often occur too late in the SDLC which is something we would like to improve upon.
5. Product Managers only have limited technical knowledge and require assistance in describing the technical implementation details for less experienced developers.
6. The frontend-developers are competent and can be frustrated by delays in API availability
7. We want work between frontend and backend to happen in parallel.

# Understanding of the challenges
It seems that the core problem is the growing business outpaces the capacity of the backend engineering teams.

Improving productivity of the backend developers would help solve the problem. 

Hence [DORA](https://www.atlassian.com/devops/frameworks/dora-metrics) framework is a suitable methodology to be applied in this case.

Our goal is to improve these DORA metrics:
- Frequency of deployments
- Lead time for changes
- Change failure rate
- Time to recovery

Also, I would like to add one addtional metric:
- Time from idea to code

# To improve time from idea to code
## Use micro-services
Micro-services are much easier to understand and develop. Product managers can get shorter feedback loops  with less experienced developers.

It basically shifts the burden of understanding/managing complexity from developers to architects.

### Division of services
In this case, the service is divided into a few micro-services with a single responsibility.
- The [Account](https://github.com/lipingtababa/account/) micro-service 
- The [Invoice](https://github.com/lipingtababa/invoice) micro-service
- The [Transaction](https://github.com/lipingtababa/transaction) micro-service
- The [Card](https://github.com/lipingtababa/card) micro-service
- The [Customer-service](https://github.com/lipingtababa/customer) micro-service

### Use of a consistent service communication mechanism.
[AWS Cloud Map](./infrastructure/aws/service.tf#L128) is used for service discovery.

Also, a [rpc-client](./src/rpc_client.ts) is provided.

### Defining clear interfaces between micro-services and front/back-ends
This is demostrated in:
- The [OpenAPI Spec ](./openapi.yaml)
- The [interfaces](./src/interfaces.ts) defined in typescript
- The [validition of interfaces](./package.json#L15C1-L16C1)

With interfaces well defined and respected, frontend and backend engineers are able to work in paralle. 

# To improve lead time for changes
## Provide a one-click-away CICD pipeline out of box for a new project.

This is demostrated in the github actions [workflow](./.github/workflows/service.yml)

## Use infrastructure-as-code
Everything is code:
- The business logic
- The infrastructure
- The access control policy
- The configuration and secrets
- The test data
- The pipelines themselves

# To improve frequency of deployments and change failure rate
One thing that stops less experienced developers from releasing is the fear of casuing incidents.
To mitigate the fear, we should ensure that systems are reliable, secure and scalable out of box.

## To improve general code quality
- Integrate lint tools, unit test suite into the pipeline.
- Run end-2-end test suite in the pipeline.

## To ensure availability
A decent infrastructure architecture is provided out of box.
- The database is always backed up.
- The database is always HA in production environment.
- A load balancer is always in front of a service.

## To ensure security
- Network Access control is in place to limit blasting radius in case that some services are compromised.
- So is the IAM access control.

## To ensure scalability
- A [healthcheck endpoint](./src/index.ts#L143) is required and checked.
- Database foreign keys are not used.
- All services are stateless.

# To improve time to recovery
- Logs and metrics is provided out of box. Tracing can be enabled.
- A common logger is provided as a module.
- In worst case, we can rebuild the whole system in another region.

# TODO
- Run db operations and S3 presigned-url operation in parallel.
- Refine IAM policies to apply least-priviledges-principle.
- Use flyaway or liquibase to integrate DB management into the CI/CD pipeline. At this moment, tables are created manually.
- Add customized security groups for containers and DBs.
- The infrastructure should be split into 3 parts: the foundation(ECR, cluster), the service, the dependencies(DB, S3)
- HTTPS is not used since certificate doesn't use a pay-as-you-use pricing model.
- Communication among services are not encrypted.
