resource "aws_ecr_repository" "the_image_repo" {
  name = "${var.app_name}"
}