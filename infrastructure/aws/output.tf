output "alb_address" {
  value = aws_lb.lb.dns_name
}

output "service_name" {
  value = aws_ecs_service.the_ecs_service.name
}
