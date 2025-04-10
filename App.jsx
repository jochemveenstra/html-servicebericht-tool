import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function HtmlServiceberichtGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const generateHTML = () => {
    const paragraphs = input.trim().split(/\n{2,}/);
    const htmlBlocks = paragraphs
      .filter(p => p.trim())
      .map(p => `<p>${p.trim()}</p>\n<p>&nbsp;</p>`);

    const finalOutput = htmlBlocks.join("\n").replace(/<p>&nbsp;<\/p>\n?$/, "");
    setOutput(finalOutput);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">HTML Servicebericht Generator</h1>
      <p className="text-muted-foreground">
        Plak hieronder je servicebericht tekst (meerdere alinea's toegestaan, gescheiden door een witregel).
        Eventuele HTML-links worden nog niet automatisch herkend.
      </p>

      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={12}
        placeholder="Plak hier je tekst..."
        className="text-base"
      />

      <Button onClick={generateHTML} className="text-lg">
        Genereer HTML
      </Button>

      {output && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Gegenereerde HTML</h2>
              <Textarea value={output} readOnly rows={output.split("\n").length} className="font-mono text-sm" />
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
