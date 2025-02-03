resource "docker_container" "monorepo_storage" {
  name    = "monorepo-storage"
  image   = "minio/minio:RELEASE.2025-01-20T14-49-07Z"
  command = ["server", "--console-address", ":9001", "/data"]

  env = [
    "MINIO_ROOT_USER=admin",
    "MINIO_ROOT_PASSWORD=12345678",
  ]

  wait = true

  healthcheck {
    test         = ["CMD", "mc", "ready", "local"]
    interval     = "1s"
    retries      = 5
    start_period = "1s"
    timeout      = "20s"
  }

  networks_advanced {
    name = docker_network.monorepo_network.id
  }
  volumes {
    volume_name    = docker_volume.monorepo_minio_volume.name
    container_path = "/data"
  }
  ports {
    internal = 9000
    external = 9000
  }
  ports {
    internal = 9001
    external = 9001
  }
}

resource "docker_volume" "monorepo_minio_volume" {
  name = "monorepo-minio-volume"
}

resource "minio_s3_bucket" "monorepo_storage" {
  depends_on = [docker_container.monorepo_storage]
  bucket     = "monorepo-storage"
}
