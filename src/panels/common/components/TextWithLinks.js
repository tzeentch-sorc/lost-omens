import {
    Card,
    Button,
    Text
} from "@vkontakte/vkui";
import { Icon28DocumentOutline } from "@vkontakte/icons";
import { motion } from "framer-motion";
import "../css/TextWithLinks.css";

const TextWithLinks = ({ text }) => {
    const linkRegex = /(https?:\/\/[^\s]+)/g; 
    const parts = text.split(linkRegex); 

    return (
        <div className="loquenta-column">
            {parts.map((part, i) => {
                if (part.match(/^https?:\/\//)) {
                    const isGoogleDocs = part.includes(
                        "docs.google.com"
                    );
                    const serviceName = isGoogleDocs
                        ? "Google Docs"
                        : "Внешний источник";

                    return (
                        <motion.div
                            key={i}
                            className="loquenta-link-wrapper"
                            initial={{
                                opacity: 0,
                                y: 18,
                                scale: 0.98,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                            }}
                            transition={{
                                duration: 0.45,
                                delay: i * 0.06,
                                type: "spring",
                                stiffness: 120,
                            }}
                            whileHover={{
                                scale: 1.02,
                            }}
                        >
                            <motion.div
                                aria-hidden
                                initial={false}
                                animate={{
                                    backgroundPosition: [
                                        "0% 50%",
                                        "100% 50%",
                                        "0% 50%",
                                    ],
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="loquenta-gradient"
                            />

                            <Card className="loquenta-card">
                                <div className="loquenta-card-header">
                                    <div className="loquenta-card-info">
                                        <div className="loquenta-icon-wrapper">
                                            <Icon28DocumentOutline />
                                        </div>
                                        <div>
                                            <Text className="loquenta-service-name">
                                                {
                                                    serviceName
                                                }
                                            </Text>
                                            <Text className="loquenta-service-subtext">
                                                Читать больше
                                            </Text>
                                        </div>
                                    </div>

                                    <Button
                                        href={part}
                                        target="_blank"
                                        size="m"
                                    >
                                        Открыть
                                    </Button>
                                </div>
                            </Card>

                            <motion.div
                                aria-hidden
                                className="loquenta-pulse"
                                initial={false}
                                whileHover={{
                                    scale: 1.05,
                                    opacity: 1,
                                    boxShadow:
                                        "0 0 30px 8px rgba(59,130,246,0.5), 0 0 60px 16px rgba(139,92,246,0.3), 0 0 90px 24px rgba(217,70,239,0.2)",
                                }}
                                animate={{
                                    opacity: [
                                        0.1,
                                        0.4,
                                        0.1,
                                    ],
                                    scale: [1, 1.02, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.div>
                    );
                }

                return (
                    <Text
                        key={i}
                        className="loquenta-text"
                    >
                        {part}
                    </Text>
                );
            })}
        </div>
    );
}
export default TextWithLinks;