resource "aws_iam_role" "pod_role" {
  name = "${var.app_name}_pod"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Principal": {
        "Service": [
          "pods.eks.amazonaws.com",
          "ecs-tasks.amazonaws.com",
          "ecs.amazonaws.com"
        ]
      },
      "Action": [
                "sts:AssumeRole",
                "sts:TagSession"
            ],
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "pod_role_access_s3" {
  role       = aws_iam_role.pod_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}

resource "aws_iam_role_policy_attachment" "pod_role_pull_image" {
  role       = aws_iam_role.pod_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser"
}

resource "aws_iam_role_policy_attachment" "pod_role_parameter_store" {
  role       = aws_iam_role.pod_role.name
  policy_arn = aws_iam_policy.parameter_store_policy.arn
}

resource "aws_iam_role_policy_attachment" "pod_role_ssm" {
  role       = aws_iam_role.pod_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMReadOnlyAccess"
}

resource "aws_iam_role_policy_attachment" "pod_role_cloudwatch" {
  role       = aws_iam_role.pod_role.name
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchLogsFullAccess"
}

resource "aws_iam_role_policy_attachment" "pod_role_ecs" {
  role       = aws_iam_role.pod_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

