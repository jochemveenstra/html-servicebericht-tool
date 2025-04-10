import { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
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
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>HTML Servicebericht Generator</h1>
      <p style={{ marginBottom: '1rem', color: '#555' }}>
        Plak hieronder je servicebericht tekst. Elke alinea wordt automatisch HTML. Witregels blijven behouden.
      </p>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={10}
        style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
        placeholder="Plak hier je tekst..."
      />
      <button
        onClick={generateHTML}
        style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', fontSize: '1rem', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px' }}
      >
        Genereer HTML
      </button>

      {output && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ marginTop: '2rem' }}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Gegenereerde HTML</h2>
          <textarea
            value={output}
            readOnly
            rows={output.split("\n").length}
            style={{ width: '100%', fontFamily: 'monospace', padding: '1rem', fontSize: '0.9rem' }}
          />
        </motion.div>
      )}
    </div>
  );
}
