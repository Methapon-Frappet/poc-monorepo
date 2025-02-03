resource "docker_container" "api" {
  depends_on = [docker_container.monorepo_database]

  image = "${var.org_docker_registry}/poc-monorepo/api:0.0.1"
  name  = "monorepo-api"

  env = []

  ports {
    internal = 3000
    external = 3000
  }
}

resource "docker_container" "web" {
  image = "${var.org_docker_registry}/poc-monorepo/web:0.0.1"
  name  = "monorepo-web"
  init  = true

  env = []

  ports {
    internal = 8080
    external = 5173
  }
}

