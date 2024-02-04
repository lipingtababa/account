resource "aws_ssm_parameter" "db_endpoint" {
  name  = "/${var.app_name}/${var.stage}/db/endpoint"
  type  = "String"
  value = aws_db_instance.db.endpoint
}

resource "aws_ssm_parameter" "db_password" {
  name  = "/${var.app_name}/${var.stage}/db/password"
  type  = "SecureString"
  value = aws_db_instance.db.password
}

resource "aws_iam_policy" "parameter_store_policy" {
  name        = "${var.app_name}_parameter_store_policy"
  description = "Policy to allow access to SSM parameter store"
  policy      = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow",
        Action   = [
          "ssm:GetParameters",
          "ssm:GetParameter",
          "ssm:DescribeParameters",
          "ssm:DescribeParameter",
          "kms:Decrypt"
        ],
        Resource = "arn:aws:ssm:${var.aws_region}:${var.aws_account}:parameter/${var.app_name}/${var.stage}/*"
      }
    ]
  })
}
