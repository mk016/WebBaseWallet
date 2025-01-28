import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Copy, Check, Maximize2 } from 'lucide-react';

export function SeedPhrase({ mnemonic }) {
    const [copying, setCopying] = useState({});
    const words = mnemonic.split(" ");

    const copyWord = async (word, index) => {
        await navigator.clipboard.writeText(word);
        setCopying({ ...copying, [index]: true });
        setTimeout(() => {
            setCopying({ ...copying, [index]: false });
        }, 2000);
    };

    const copyAll = async () => {
        await navigator.clipboard.writeText(mnemonic);
        setCopying({ ...copying, all: true });
        setTimeout(() => {
            setCopying({ ...copying, all: false });
        }, 2000);
    };

    return (
        <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Your Secret Phrase</CardTitle>
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={copyAll}
                        className="text-neutral-400 hover:text-neutral-300"
                    >
                        {copying.all ? 
                            <Check className="h-4 w-4 text-green-500" /> : 
                            <Copy className="h-4 w-4" />
                        }
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Maximize2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {words.map((word, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="bg-neutral-800 p-3 rounded-lg text-sm text-neutral-300 flex justify-between items-center">
                                <span className="text-neutral-500 mr-2">{index + 1}.</span>
                                <span className="flex-grow">{word}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => copyWord(word, index)}
                                >
                                    {copying[index] ? 
                                        <Check className="h-3 w-3 text-green-500" /> : 
                                        <Copy className="h-3 w-3" />
                                    }
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
} 