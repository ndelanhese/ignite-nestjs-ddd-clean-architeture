DOCKER_COMPOSE_FILE=.docker/docker-compose.yml
DOCKER_ENV_FILE=.docker/.env

ifeq ($(wildcard $(DOCKER_COMPOSE_FILE)),)
$(error $(DOCKER_COMPOSE_FILE) not found.)
endif

ifeq ($(wildcard $(DOCKER_ENV_FILE)),)
$(error $(DOCKER_ENV_FILE) not found.)
endif

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ Colors definitions                                                          │
# └─────────────────────────────────────────────────────────────────────────────┘
CR=\033[0;31m
CG=\033[0;32m
CY=\033[0;33m
CB=\033[0;36m
RC=\033[0m

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ Infra commands                                                              │
# └─────────────────────────────────────────────────────────────────────────────┘
.PHONY: build
build:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) --env-file $(DOCKER_ENV_FILE) build

.PHONY: start
start:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) --env-file $(DOCKER_ENV_FILE) up -d

.PHONY: stop
stop:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) --env-file $(DOCKER_ENV_FILE) down

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ Help                                                                        │
# └─────────────────────────────────────────────────────────────────────────────┘
help:
	@echo ""
	@echo -e "${CY}Usage${RC}"
	@echo -e "   make ${CG}<command>${RC}"
	@echo  ""
	@echo -e "${CY}Infra commands${RC}"
	@echo -e "${CG}   build               ${RC}Build all containers"
	@echo -e "${CG}   start               ${RC}Start all containers"
	@echo -e "${CG}   stop                ${RC}Stop all containers"
	@echo  ""