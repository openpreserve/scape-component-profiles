#!/usr/bin/ruby -w

require 'trollop'
require 'nokogiri'

# A tool
#
class Tool
  def initialize (path)
    @licenses = { 'Apache Licence 2.0' => 'http://www.apache.org/licenses/LICENSE-2.0',
                  'GPLv2' => 'http://creativecommons.org/licenses/GPL/2.0/',
                  'LGPLv3' => 'https://www.gnu.org/licenses/lgpl-3.0.html'
    }

    f = File.open(path)
    @doc = Nokogiri::XML(f)
  end

  def getOperations
    ops = Array.new
    @doc.xpath('//tool:operation', 'tool' => 'http://scape-project.eu/tool').each do |op|
      ops.push(Operation.new(op))
    end
    return ops
  end

  def getLicense
    return @licenses[@doc.xpath('//tool:installation/tool:license/@type', 'tool' => 'http://scape-project.eu/tool').first.to_s]
  end
end

# Operation of a tool
#
class Operation
  def initialize (op)
    @op = op
  end

  def getName
    name = @op.xpath('@name')
    return name
  end
end

# Writes RDF
#
class RdfWriter
  def initialize (ontologyUri, repositoryId, repositoryName, repositoryLocation)
    @params = { 'ontologyUri' => ontologyUri,
                'repositoryId' => repositoryId,
                'repositoryName' => repositoryName,
                'repositoryLocation' => repositoryLocation }
  end
  
  def printHeader
    puts "<?xml version=\"1.0\"?>"

    puts "<!DOCTYPE rdf:RDF [\n"\
      " <!ENTITY owl \"http://www.w3.org/2002/07/owl#\" >\n"\
      " <!ENTITY xsd \"http://www.w3.org/2001/XMLSchema#\" >\n"\
      " <!ENTITY rdfs \"http://www.w3.org/2000/01/rdf-schema#\" >\n"\
      " <!ENTITY rdf \"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" >\n"\
      " <!ENTITY components \"http://purl.org/DP/components#\" >\n"\
      "]>\n\n"

    puts "<rdf:RDF xmlns=\":::ontologyUri:::#\"\n"\
      "  xml:base=\":::ontologyUri:::\"\n"\
      "  xmlns:rdfs=\"http://www.w3.org/2000/01/rdf-schema#\"\n"\
      "  xmlns:owl=\"http://www.w3.org/2002/07/owl#\"\n"\
      "  xmlns:xsd=\"http://www.w3.org/2001/XMLSchema#\"\n"\
      "  xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"\n"\
      "  xmlns:components=\"http://purl.org/DP/components#\">\n"\
      "  <owl:Ontology rdf:about=\":::ontologyUri:::\">\n"\
      "    <owl:imports rdf:resource=\"http://purl.org/DP/components\"/>\n"\
      "  </owl:Ontology>\n\n".gsub( /:::(.+?):::/ ) { @params[$1] }
  end

  def printRepository
    puts "  <owl:NamedIndividual rdf:about=\":::ontologyUri:::#:::repositoryId:::\">\n"\
      "    <rdf:type rdf:resource=\"&components;PackageRepository\"/>\n"\
      "    <components:location>:::repositoryLocation:::</components:location>\n"\
      "    <components:name>:::repositoryName:::</components:name>\n"\
      "  </owl:NamedIndividual>\n\n".gsub( /:::(.+?):::/ ) { @params[$1] }
  end

  def printFooter
    puts "</rdf:RDF>"
  end

  def printOp (dependency, operation)

    @params['packageName'] = operation.getName

    puts "  <owl:NamedIndividual rdf:about=\":::ontologyUri:::#:::packageName:::\">\n"\
      "    <rdf:type rdf:resource=\"&components;Dependency\"/>\n"\
      "    <components:name>:::packageName:::</components:name>\n"\
      "    <components:hostedIn rdf:resource=\":::ontologyUri:::#:::repositoryId:::\"/>\n"\
      "    <components:hasEnvironment rdf:resource=\"&components;Debian\"/>\n".gsub( /:::(.+?):::/ ) { @params[$1] }

    if defined? dependency.getLicense
      puts "    <licence:hasLicense rdf:resource=\":::license:::\"/>".gsub( /:::(.+?):::/ ) { dependency.getLicense }
    end 

    puts "  </owl:NamedIndividual>"
  end
end

# Parse parameters
opts = Trollop::options do
  banner <<-EOS
Converts SCAPE toolspec files into an ontology based on http://purl.org/DP/components.

Usage:
       toolspec2owl.rb [options] glob
where [options] are:
  EOS
  opt :ontologyUri, "URI of ontology", :short => 'o', :type => String
  opt :repositoryId, "ID of the repository", :short => 'i', :type => String
  opt :repositoryName, "Name of the repository", :short => 'n', :type => String
  opt :repositoryLocation, "Location of the repository", :short => 'l', :type => String
end

Trollop::die :ontologyUri, "must be specified" unless opts[:ontologyUri]
Trollop::die :repositoryId, "must be specified" unless opts[:repositoryId]
Trollop::die :repositoryName, "must be specified" unless opts[:repositoryName]
Trollop::die :repositoryLocation, "must be specified" unless opts[:repositoryLocation]

Trollop::die "glob must be specified (e.g. ./*.xml)" if not ARGV.any?

# Write RDF
rdf = RdfWriter.new(opts[:ontologyUri], opts[:repositoryId], opts[:repositoryName], opts[:repositoryLocation])
rdf.printHeader
rdf.printRepository
ARGV.each do |glob|
  Dir.glob(glob).each do |element|
    dep = Tool.new(element)
    ops = dep.getOperations

    ops.each do |op|
      puts rdf.printOp(dep, op)
    end 
  end
end
rdf.printFooter

