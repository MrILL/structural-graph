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



DEFAULT_SOURCE_ROOT = apps/

language = ts
name = 
app-name = backend

generate-nest-res:
	$(NX_NESTJS):resource $(name) \
	--language=$(language) \
	--path=$(NX_NESTJS_DEFAULT_MODULES_PATH) \
	--sourceRoot=$(DEFAULT_SOURCE_ROOT)/$(app-name)/src \
	$(DRY_RUN) \
	$(NO_INTERACTIVE) \

nx-frontend:
	nx serve frontend --port=8080

nx-backend:
	nx serve backend
