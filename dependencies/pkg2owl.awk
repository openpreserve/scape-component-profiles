BEGIN {
    FS = ": ";
    
    exitInvoked = 0

    if (length(indent) == 0) {
        indent = "  "
    }
    individualSeparator = "\n"
    checkParams()

    if (length(filterFile) > 0) {
        while (getline < filterFile) {
            filterPackages[$0] = 1
        }
        close(filterFile)
    }

    printHeader()
    printRepository()
}

$1 == "Package" {

    processPackage = 1
    packageName = $2

    if (length(filterFile) > 0) {
        if (! filterPackages[packageName] > 0) {
            processPackage = 0
        }
    }

    if (! processPackage) next
  
    print individualSeparator

    print "<owl:NamedIndividual rdf:about=\"" ontologyUri "#" packageName "\">"
    print indent "<rdf:type rdf:resource=\"&components;Dependency\"/>"
    print indent "<components:name>" packageName "</components:name>"
    print indent "<components:hostedIn rdf:resource=\"" ontologyUri "#" repositoryId "\"/>"
    print indent "<components:hasEnvironment rdf:resource=\"&components;Debian\"/>"

    if (length(license) > 0) {
        print indent "<licence:hasLicense rdf:resource=\"" license "\"/>"
    }
}

$1 == "Version" {
    if (! processPackage) next
    print indent "<components:dependencyVersion>" $2 "</components:dependencyVersion>"
}

$0 ~ /^$/ {
    if (length(packageName) > 0) {
        packageName = ""

        if (! processPackage) next

        print "</owl:NamedIndividual>"
    }
}

END {
    if (! exitInvoked  ) {
        print "</rdf:RDF>"
    }
}


# Prints the RDF/OWL header
function printHeader() {
    print "<?xml version=\"1.0\"?>"

    print \
"<!DOCTYPE rdf:RDF [\n",
"    <!ENTITY owl \"http://www.w3.org/2002/07/owl#\" >\n",
"    <!ENTITY xsd \"http://www.w3.org/2001/XMLSchema#\" >\n",
"    <!ENTITY rdfs \"http://www.w3.org/2000/01/rdf-schema#\" >\n",
"    <!ENTITY rdf \"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" >\n",
"    <!ENTITY components \"http://purl.org/DP/components#\" >\n",
"]>\n"

    print \
"<rdf:RDF xmlns=\"" ontologyUri "#\"\n",
"     xml:base=\"" ontologyUri "\"\n",
"     xmlns:rdfs=\"http://www.w3.org/2000/01/rdf-schema#\"\n",
"     xmlns:owl=\"http://www.w3.org/2002/07/owl#\"\n",
"     xmlns:xsd=\"http://www.w3.org/2001/XMLSchema#\"\n",
"     xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"\n",
"     xmlns:components=\"http://purl.org/DP/components#\">\n",
"    <owl:Ontology rdf:about=\"" ontologyUri "\">\n",
"        <owl:imports rdf:resource=\"http://purl.org/DP/components\"/>\n",
"    </owl:Ontology>\n"
}


# Prints the repository individual
function printRepository() {
    print \
"<owl:NamedIndividual rdf:about=\"" ontologyUri "#" repositoryID "\">\n",
indent "<rdf:type rdf:resource=\"&components;PackageRepository\"/>\n",
indent "<components:location>" repositoryLocation "</components:location>\n",
indent "<components:name>" repositoryName "</components:name>\n",
"</owl:NamedIndividual>\n"
}

# Checks parameters
function checkParams() {
    if (length(repositoryId) == 0) {
        printUsage()
        exitInvoked = 1
        exit 1
    }

    if (length(repositoryName) == 0) {
        printUsage()
        exitInvoked = 1
        exit 1
    }

    if (length(repositoryLocation) == 0) {
        printUsage()
        exitInvoked = 1
        exit 1
    }

    if (length(ontologyUri) == 0) {
        printUsage()
        exitInvoked = 1
        exit 1
    }
}

# Prints a usage message
function printUsage() {
    print "Usage: awk -v repositoryId=repository_id -v repositoryName=repository_name -v repositoryLocation=repository_location -v ontologyUri=ontology_uri [-v license=license_uri] [-v filterFile=filter_file_name] -f inputfile"
}

