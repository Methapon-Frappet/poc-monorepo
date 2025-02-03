resource "docker_container" "monorepo_database" {
  name  = "monorepo-database"
  image = "postgres:alpine"
  env = [
    "POSTGRES_DB=monorepo",
    "POSTGRES_PASSWORD=12345678",
  ]

  wait = true

  healthcheck {
    test         = ["CMD", "pg_isready", "-d", "monorepo"]
    interval     = "1s"
    retries      = 5
    start_period = "1s"
    timeout      = "20s"
  }
  networks_advanced {
    name = docker_network.monorepo_network.id
  }
  volumes {
    volume_name    = docker_volume.monorepo_database_volume.name
    container_path = "/var/lib/postgresql/data"
  }
  ports {
    internal = 5432
    external = 5432
  }
}

resource "docker_volume" "monorepo_database_volume" {
  name = "monorepo-database"
}
