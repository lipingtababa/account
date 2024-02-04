

resource "aws_ecs_task_definition" "the_task_definition" {
  family                   = "${var.app_name}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.pod_role.arn

  container_definitions = jsonencode([
    {
      name      = "web",
      image     = "${var.aws_account}.dkr.ecr.${var.aws_region}.amazonaws.com/${var.app_name}:${var.app_version}"
      cpu       = 256,
      memory    = 512,
      essential = true,
      portMappings = [
        {
          containerPort = 80,
          hostPort      = 80,
          protocol      = "tcp"
        },
      ],
    },
  ])
}

resource "aws_ecs_service" "the_ecs_service" {
  name            = "${var.app_name}-service"
  cluster         = "overview"
  task_definition = aws_ecs_task_definition.the_task_definition.arn
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = ["subnet-0510dc3e9b9d9e987", "subnet-0e1807b5f1ce6056a", "subnet-0c5b58dd62c87065b"]
    security_groups  = ["sg-0e5a3cc3f26bbcc96"]
    assign_public_ip = true
  }

  desired_count = 1

  deployment_controller {
    type = "ECS"
  }

  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }

}
