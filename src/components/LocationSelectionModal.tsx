import { useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { tokens } from "../theme";

interface LocationSelectionModalProps {
  open: boolean;
  onClose: () => void;
}

const locations = [
  {
    name: "Scarborough",
    address: "80 Nashdene Rd, Scarborough, ON M1V 5E4",
    phone: "(416) 299 1999",
    orderLink:
      "https://www.eastserve.ca/ordering/restaurant/menu?company_uid=b26cb912-8916-4de5-ae9e-bdcab2c08fa8&restaurant_uid=548c1a41-011d-488a-8876-d7815c9181d7&facebook=true",
  },
  {
    name: "Markham",
    address: "72-30 Karachi Dr, Markham, ON L3S 0B6",
    phone: "(289) 554 5999",
    orderLink:
      "https://www.eastserve.ca/ordering/restaurant/menu?company_uid=b26cb912-8916-4de5-ae9e-bdcab2c08fa8&restaurant_uid=d171d5c5-0412-4013-b588-c52b5513f592&facebook=true",
  },
];

const cardStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const LocationSelectionModal = ({
  open,
  onClose,
}: LocationSelectionModalProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const handleLocationSelect = (orderLink: string) => {
    window.open(orderLink, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: { xs: "16px", md: "20px" },
              bgcolor: tokens.colors.dark.bg,
              color: tokens.colors.dark.textPrimary,
              border: `1px solid ${tokens.colors.dark.borderLight}`,
              m: { xs: 2, md: 3 },
              boxShadow: `0 40px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(184,134,11,0.10)`,
              overflow: "hidden",
              position: "relative",
              maxWidth: { xs: "100%", md: 680, xl: 780 },
            },
          }}
          slotProps={{
            backdrop: {
              sx: {
                bgcolor: "rgba(10,8,5,0.80)",
                backdropFilter: "blur(12px)",
              },
            },
          }}
        >
          {/* Decorative top accent — animated gradient */}
          <Box
            aria-hidden="true"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: `linear-gradient(90deg, transparent 0%, ${tokens.colors.primary.dark} 20%, ${tokens.colors.primary.main} 40%, ${tokens.colors.primary.light} 50%, ${tokens.colors.primary.main} 60%, ${tokens.colors.primary.dark} 80%, transparent 100%)`,
              boxShadow: `0 0 16px rgba(184,134,11,0.4)`,
            }}
          />

          {/* Background grid pattern */}
          <Box
            aria-hidden="true"
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `linear-gradient(${tokens.colors.dark.borderFaint} 1px, transparent 1px),
                                linear-gradient(90deg, ${tokens.colors.dark.borderFaint} 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
              opacity: 0.5,
              pointerEvents: "none",
            }}
          />

          {/* Radial glow */}
          <Box
            aria-hidden="true"
            sx={{
              position: "absolute",
              top: "-30%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "120%",
              height: "80%",
              background: "radial-gradient(ellipse at center, rgba(184,134,11,0.07) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />

          {/* Header */}
          <Box
            sx={{
              position: "relative",
              px: { xs: 3, md: 4, xl: 5 },
              pt: { xs: 3.5, md: 4, xl: 4.5 },
              pb: { xs: 1, md: 1.5 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 28,
                      height: "1px",
                      background: `linear-gradient(90deg, ${tokens.colors.primary.main}, transparent)`,
                    }}
                  />
                  <Typography
                    variant="overline"
                    sx={{
                      color: tokens.colors.primary.main,
                      letterSpacing: "0.28em",
                      fontSize: { xs: "0.58rem", md: "0.64rem", xl: "0.72rem" },
                    }}
                  >
                    {t("locationModal.orderOnline")}
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: tokens.fonts.display,
                    fontWeight: 400,
                    fontSize: { xs: "1.5rem", md: "1.8rem", xl: "2rem" },
                    color: tokens.colors.dark.textPrimary,
                    textTransform: "uppercase",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t("locationModal.chooseLocation")}
                </Typography>
              </Box>
              <IconButton
                aria-label={t("locationModal.close")}
                onClick={onClose}
                sx={{
                  color: tokens.colors.dark.textTertiary,
                  border: `1px solid ${tokens.colors.dark.borderSubtle}`,
                  borderRadius: tokens.radius.sm,
                  width: { xs: 40, md: 44 },
                  height: { xs: 40, md: 44 },
                  mt: 0.5,
                  transition: tokens.transitions.fast,
                  "&:hover": {
                    bgcolor: "rgba(184,134,11,0.12)",
                    borderColor: tokens.colors.primary.main,
                    color: tokens.colors.dark.textPrimary,
                    transform: "rotate(90deg)",
                  },
                }}
              >
                <CloseIcon sx={{ fontSize: { xs: "1.1rem", md: "1.25rem" } }} />
              </IconButton>
            </Box>
          </Box>

          <DialogContent
            sx={{
              px: { xs: 3, md: 4, xl: 5 },
              pt: { xs: 2, md: 2.5 },
              pb: { xs: 3, md: 4, xl: 5 },
              overflow: "visible",
            }}
          >
            <Typography
              sx={{
                color: tokens.colors.dark.textTertiary,
                mb: { xs: 3, md: 3.5 },
                fontSize: { xs: "0.85rem", md: "0.92rem", xl: "1rem" },
                maxWidth: 400,
                lineHeight: 1.65,
              }}
            >
              {t("locationModal.selectNearest")}
            </Typography>

            <motion.div
              variants={cardStagger}
              initial="hidden"
              animate="visible"
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: { xs: 2, md: 2.5, xl: 3 },
                }}
              >
                {locations.map((location, index) => (
                  <motion.div key={location.name} variants={cardItem}>
                    <Box
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e: React.KeyboardEvent) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleLocationSelect(location.orderLink);
                        }
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => handleLocationSelect(location.orderLink)}
                      sx={{
                        position: "relative",
                        border: `1.5px solid ${hoveredIndex === index ? tokens.colors.primary.main : tokens.colors.dark.borderLight}`,
                        borderRadius: { xs: "14px", md: "16px" },
                        p: { xs: 2.5, md: 3, xl: 3.5 },
                        transition: "all 0.38s cubic-bezier(0.22, 1, 0.36, 1)",
                        cursor: "pointer",
                        bgcolor: hoveredIndex === index ? tokens.colors.dark.elevated : tokens.colors.dark.card,
                        transform: hoveredIndex === index ? "translateY(-4px)" : "none",
                        boxShadow: hoveredIndex === index
                          ? tokens.shadows.goldDeep
                          : "none",
                        overflow: "hidden",
                        "&:active": { transform: "translateY(0)" },
                      }}
                    >
                      {/* Top glow on hover */}
                      <Box
                        aria-hidden="true"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "2px",
                          background: hoveredIndex === index
                            ? `linear-gradient(90deg, transparent, ${tokens.colors.primary.main}, transparent)`
                            : "transparent",
                          transition: "background 0.35s ease",
                          boxShadow: hoveredIndex === index ? `0 0 12px rgba(184,134,11,0.5)` : "none",
                        }}
                      />

                      {/* Location icon + name */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          mb: 2.5,
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: 42, md: 46, xl: 50 },
                            height: { xs: 42, md: 46, xl: 50 },
                            borderRadius: "12px",
                            bgcolor: hoveredIndex === index ? "rgba(184,134,11,0.16)" : "rgba(184,134,11,0.09)",
                            border: `1px solid ${hoveredIndex === index ? tokens.colors.primary.main : "rgba(184,134,11,0.18)"}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            transition: tokens.transitions.normal,
                          }}
                        >
                          <LocationOnIcon
                            sx={{
                              color: tokens.colors.primary.main,
                              fontSize: { xs: "1.2rem", md: "1.35rem", xl: "1.5rem" },
                            }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontFamily: tokens.fonts.display,
                            fontWeight: 400,
                            fontSize: { xs: "1.3rem", md: "1.45rem", xl: "1.6rem" },
                            color: hoveredIndex === index ? tokens.colors.dark.textPrimary : "rgba(245,240,228,0.88)",
                            textTransform: "uppercase",
                            letterSpacing: "-0.01em",
                            transition: tokens.transitions.fast,
                          }}
                        >
                          {location.name}
                        </Typography>
                      </Box>

                      {/* Address */}
                      <Typography
                        sx={{
                          color: tokens.colors.dark.textSecondary,
                          fontSize: { xs: "0.82rem", md: "0.88rem", xl: "0.95rem" },
                          lineHeight: 1.5,
                          mb: 1.5,
                          pl: 0.5,
                        }}
                      >
                        {location.address}
                      </Typography>

                      {/* Phone */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 3,
                          pl: 0.5,
                        }}
                      >
                        <PhoneIcon
                          sx={{
                            color: tokens.colors.dark.textTertiary,
                            fontSize: { xs: "0.9rem", md: "1rem" },
                          }}
                        />
                        <Typography
                          sx={{
                            color: tokens.colors.dark.textTertiary,
                            fontSize: { xs: "0.8rem", md: "0.85rem", xl: "0.92rem" },
                          }}
                        >
                          {location.phone}
                        </Typography>
                      </Box>

                      {/* Order button */}
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="btn-shimmer"
                        endIcon={
                          <ArrowForwardIcon
                            sx={{
                              fontSize: "0.9rem !important",
                              transition: "transform 0.25s ease",
                            }}
                          />
                        }
                        sx={{
                          py: { xs: 1.3, md: 1.5, xl: 1.6 },
                          fontWeight: 600,
                          fontSize: { xs: "0.82rem", md: "0.86rem", xl: "0.92rem" },
                          color: tokens.colors.dark.bg,
                          textTransform: "none",
                          borderRadius: "10px",
                          letterSpacing: "0.02em",
                          background: `linear-gradient(135deg, ${tokens.colors.primary.main} 0%, ${tokens.colors.primary.dark} 100%)`,
                          "&:hover": {
                            background: `linear-gradient(135deg, ${tokens.colors.primary.light} 0%, ${tokens.colors.primary.main} 100%)`,
                          },
                          "&:hover .MuiButton-endIcon": {
                            transform: "translateX(4px)",
                          },
                        }}
                      >
                        {t("locationModal.orderFrom", { name: location.name })}
                      </Button>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </motion.div>

            {/* Bottom note */}
            <Box
              sx={{
                mt: { xs: 3, md: 3.5 },
                pt: { xs: 2.5, md: 3 },
                borderTop: `1px solid ${tokens.colors.dark.borderSubtle}`,
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  color: tokens.colors.dark.textTertiary,
                  fontSize: { xs: "0.72rem", md: "0.78rem", xl: "0.82rem" },
                  letterSpacing: "0.04em",
                }}
              >
                {t("locationModal.partnerNote")}
              </Typography>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default LocationSelectionModal;
