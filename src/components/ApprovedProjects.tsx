
import { useState } from "react";
import { ExternalLink, Search, ShieldCheck } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

// Sample data for approved projects - only BTM Relaunch and TCOIN
const APPROVED_PROJECTS = [
  {
    id: 1,
    name: "BTM Relaunch",
    category: "Token",
    website: "https://btm.io",
    approvalDate: "03/03/2025",
    active: false,
    coverage: "Full"
  },
  {
    id: 2,
    name: "TCOIN",
    category: "Token",
    website: "https://tcoin.finance",
    approvalDate: "03/15/2025",
    active: false,
    coverage: "Full"
  }
];

const ApprovedProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredProjects = APPROVED_PROJECTS.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="approved" className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient-gold mb-4">ApeArmor Approved</h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Projects that have passed our rigorous security audits and received the ApeArmor seal of approval
          </p>
          <Separator className="w-20 h-1 bg-apearmor-teal my-6" />
        </div>
        
        <Card className="border-apearmor-darkbronze overflow-hidden">
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects by name or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-apearmor-teal"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead>Approval Date</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Coverage Status</TableHead>
                    <TableHead className="text-right">Profile Info</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          project.active ? 'bg-green-900/20 text-green-400' : 'bg-gray-900/20 text-gray-400'
                        }`}>
                          {project.active ? 'Active' : 'Paid Closed'}
                        </span>
                      </TableCell>
                      <TableCell>{project.approvalDate}</TableCell>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          project.coverage === 'Full' ? 'bg-green-900/20 text-green-400' : 
                          project.coverage === 'Partial' ? 'bg-yellow-900/20 text-yellow-400' : 
                          'bg-red-900/20 text-red-400'
                        }`}>
                          {project.coverage}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-apearmor-teal hover:underline"
                        >
                          Visit <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No approved projects match your search criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="mt-10 text-center">
          <p className="text-muted-foreground">
            Want your project to get ApeArmor approved? <a href="#contact" className="text-apearmor-teal hover:underline">Contact us</a> to schedule an audit.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ApprovedProjects;
