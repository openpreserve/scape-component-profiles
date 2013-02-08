# scape-component-profiles
To guarantee interoperability between services and enable automation of preservation processes, preservation components must have a standardised interface. The preservation components are based on [Taverna](http://www.taverna.org.uk/) workflows as a common language. They either wrap command line tools with necessary post-processing, are directly implemented as workflows or are composed of other components.

To allow discoverability, components must be annotated with relevant information using a common vocabulary. Standardised interfaces add the possibility of automating parts of a preservation process. Additionally, dependencies allow an execution platform to run the components. All these aspects are defined as preservation component profiles.
The Taverna workbench can be extended to easily validate workflows against profiles and create and publish components in the component catalogue [myexperiment.org](http://www.myexperiment.org/).

# Repository
This repository contains the profiles, the corresponding ontology and other related files.

## Profiles
This folder contains the profiles that describe different component types. The profile specifies what metadata must be added to workflows to adhere to the profile. The metadata is added as semantic annotations based on the ontology.

## Ontology
The ontology is used to annotate the workflows.



This work is licensed under a [Creative Commons Attribution 3.0 Unported License](https://creativecommons.org/licenses/by/3.0/).

[![Creative Commons Attribution 3.0 Unported License](http://i.creativecommons.org/l/by/3.0/80x15.png)](https://creativecommons.org/licenses/by/3.0/)
