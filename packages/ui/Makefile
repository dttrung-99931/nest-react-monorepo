add-comp:
# $(filter-out $@,$(MAKECMDGOALS)) => get params after 'make add-comp'
# Path specified: --path src/atoms
	pnpm dlx shadcn@latest add $(filter-out $@,$(MAKECMDGOALS))
%:
	@: 
# %: @: is ignore error missing target error