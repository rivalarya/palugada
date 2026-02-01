import Link from "next/link";
import { FileText, ArrowRight, Github, ExternalLink } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-8 max-w-5xl mx-auto w-full space-y-12">
      
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <h1 className="text-4xl font-bold tracking-tight">Palugada</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          All-in-one tools for everyday tasks
        </p>
      </div>
      
      {/* Start Try */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Start Try</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Image to Text */}
          <Card className="flex flex-col border-primary/50 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="default">Ready</Badge>
              </div>
              <CardTitle className="mt-4">Image to Text</CardTitle>
              <CardDescription>
                Extract text from images using OCR technology.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-4">
              <Link href="/image-to-text" className="w-full">
                <Button className="w-full gap-2">
                  Open Tool <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Image Compress */}
          <Card className="flex flex-col border-primary/50 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="default">Ready</Badge>
              </div>
              <CardTitle className="mt-4">Image Compression</CardTitle>
              <CardDescription>
                Reduce image file size without losing quality.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-4">
              <Link href="/image-compression" className="w-full">
                <Button className="w-full gap-2">
                  Open Tool <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Speech to Text */}
          <Card className="flex flex-col border-primary/50 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="outline">Coming Soon</Badge>
              </div>
              <CardTitle className="mt-4">Speech to Text</CardTitle>
              <CardDescription>
                Convert audio recordings to written text.
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-4">
              <Button disabled variant="secondary" className="w-full">
                Coming Soon
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Developer Section */}
      <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white border-none">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-full">
              <Github className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">About the Developer</CardTitle>
              <CardDescription className="text-gray-300">
                rivalarya
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">
            View more of my projects and contributions on GitHub.
          </p>
        </CardContent>
        <CardFooter>
          <Link href="https://github.com/rivalarya" target="_blank">
            <Button variant="secondary" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              GitHub Profile
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}