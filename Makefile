ifeq ($(dry-run), true)
override DRY_RUN = --dry-run
else 
override DRY_RUN = 
endif
ifeq ($(no-interactive), true)
override NO_INTERACTIVE = --no-interactive
else 
override NO_INTERACTIVE = 
endif

override NX_NESTJS = nx generate @nestjs/schematics
override NX_NESTJS_DEFAULT_MODULES_PATH = modules



DEFAULT_SOURCE_ROOT = apps

app-name = backend
name = 
language = ts
db = mongoose

override _NX_NESTJS_OPTIONS = --language=$(language) \
	--path=$(NX_NESTJS_DEFAULT_MODULES_PATH) \
	--sourceRoot=$(DEFAULT_SOURCE_ROOT)/$(app-name)/src \
	$(DRY_RUN) \
	$(NO_INTERACTIVE) \

generate-nest-res:
	$(NX_NESTJS):resource $(name) ${_NX_NESTJS_OPTIONS}

generate-nest-res-custom:
	nx workspace-generator nest-mrills-resource $(name) \
	$(_NX_NESTJS_OPTIONS) \
	--db=$(db)

nx-frontend:
	nx serve frontend --port=8080

nx-backend:
	nx serve backend

### migrations

override MIGRATE_PATH = .\node_modules\.bin\migrate
override MIGRATE_OPTIONS = -c apps/backend --migrations-dir src/migrations
	

migration-create:
	${MIGRATE_PATH} create ${MIGRATE_OPTIONS} ${name}

migration-up:
	${MIGRATE_PATH} up ${MIGRATE_OPTIONS} ${name}

migration-down:
	${MIGRATE_PATH} down ${MIGRATE_OPTIONS} ${name}
