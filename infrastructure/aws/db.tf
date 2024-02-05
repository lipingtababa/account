resource "aws_db_instance" "db" {
  db_name              = "${var.app_name}"
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "16.1"
  instance_class       = "db.t4g.small"
  username             = "${var.app_name}"
  password             = random_password.password.result
  parameter_group_name = "default.postgres16"
  skip_final_snapshot  = true
  iam_database_authentication_enabled = false
  vpc_security_group_ids = [aws_security_group.db.id]
}

resource "aws_security_group" "db" {
  name        = "${var.app_name}-db"
  description = "RDS security group"
  vpc_id      = local.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}