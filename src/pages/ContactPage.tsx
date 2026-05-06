import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import PageBanner from "../components/PageBanner";
import { motion } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SendIcon from "@mui/icons-material/Send";
import { useTranslation } from "react-i18next";
import { tokens } from "../theme";

const locations = [
  {
    name: "Scarborough",
    address: "80 Nashdene Rd",
    city: "Scarborough, ON M1V 5E4",
    phones: ["(416) 299-1999", "(416) 388-4791"],
    hours: "Mon–Sun: 11:00 AM – 9:30 PM",
    mapLink: "https://maps.google.com/?q=80+Nashdene+Rd,+Scarborough,+ON",
  },
  {
    name: "Markham",
    address: "72-30 Karachi Dr",
    city: "Markham, ON L3S 0B6",
    phones: ["(289) 554-5999"],
    hours: "Mon–Sun: 11:00 AM – 9:30 PM",
    mapLink: "https://maps.google.com/?q=72-30+Karachi+Dr,+Markham,+ON",
  },
];

const enquiryTypes = [
  { key: "contact.typeGeneral",    value: "General Enquiry" },
  { key: "contact.typeCatering",   value: "Catering Request" },
  { key: "contact.typeFeedback",   value: "Feedback" },
  { key: "contact.typePartnership", value: "Partnership" },
  { key: "contact.typeOther",      value: "Other" },
];

const inputSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: tokens.colors.bg.base,
    borderRadius: tokens.radius.sm,
    transition: tokens.transitions.normal,
    "& fieldset": { borderColor: tokens.colors.border.subtle, transition: tokens.transitions.normal },
    "&:hover fieldset": { borderColor: tokens.colors.border.medium },
    "&.Mui-focused fieldset": {
      borderColor: tokens.colors.primary.main,
      boxShadow:   `0 0 0 3px ${tokens.colors.primary.glow}`,
    },
  },
  "& .MuiInputLabel-root": { color: tokens.colors.text.tertiary },
  "& .MuiInputLabel-root.Mui-focused": { color: tokens.colors.primary.main },
  "& .MuiOutlinedInput-input": { color: tokens.colors.text.primary },
  "& .MuiSelect-icon": { color: tokens.colors.text.tertiary },
};

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [sent, setSent] = useState(false);
  const { t } = useTranslation();

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.warn("Contact form submission not yet connected to backend");
    setSent(true);
    setForm({ name: "", email: "", type: "", message: "" });
  };

  return (
    <Box sx={{ bgcolor: tokens.colors.bg.base }}>
      <PageBanner
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        highlight={t("contact.highlight")}
        subtitle={t("contact.subtitle")}
        watermark={t("contact.watermark")}
      />

      {/* ── Main content ── */}
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 14 }, px: { xs: 2.5, sm: 4, lg: 8, xl: 10 } }}>
        <Box
          sx={{
            display:             "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap:                 { xs: 6, md: 8, lg: 12 },
            alignItems:          "start",
          }}
        >
          {/* ── Contact form ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Form container with bracket decorations */}
            <Box sx={{ position: "relative" }}>
              {/* Top-left bracket */}
              <Box aria-hidden="true" sx={{
                position: "absolute",
                top: -12, left: -12,
                width: 28, height: 28,
                borderTop: `2px solid ${tokens.colors.primary.main}`,
                borderLeft: `2px solid ${tokens.colors.primary.main}`,
                opacity: 0.35,
              }} />

              <Typography
                component="h2"
                sx={{
                  fontFamily:    tokens.fonts.display,
                  fontSize:      { xs: "1.8rem", md: "2.4rem" },
                  textTransform: "uppercase",
                  color:         tokens.colors.text.primary,
                  lineHeight:    0.95,
                  letterSpacing: "-0.01em",
                  mb:            1,
                }}
              >
                Send a{" "}
                <Box component="span" sx={{ color: tokens.colors.primary.main }}>
                  {t("contact.formHeading2")}
                </Box>
              </Typography>
              <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.88rem", mb: 5, lineHeight: 1.7 }}>
                {t("contact.formSubtext")}
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 3 }}
              >
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3 }}>
                  <TextField
                    label={t("contact.nameLabel")}
                    value={form.name}
                    onChange={handleChange("name")}
                    required
                    fullWidth
                    sx={inputSx}
                  />
                  <TextField
                    label={t("contact.emailLabel")}
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    required
                    fullWidth
                    sx={inputSx}
                  />
                </Box>

                <FormControl fullWidth sx={inputSx} required>
                  <InputLabel>{t("contact.typeLabel")}</InputLabel>
                  <Select
                    value={form.type}
                    label={t("contact.typeLabel")}
                    onChange={handleChange("type")}
                    required
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: tokens.colors.bg.base,
                          border: `1px solid ${tokens.colors.border.subtle}`,
                          boxShadow: tokens.shadows.lg,
                          borderRadius: tokens.radius.md,
                          "& .MuiMenuItem-root": {
                            color: tokens.colors.text.secondary,
                            fontSize: "0.9rem",
                            "&:hover": { bgcolor: tokens.colors.bg.card, color: tokens.colors.text.primary },
                            "&.Mui-selected": { bgcolor: tokens.colors.primary.glow, color: tokens.colors.primary.main },
                          },
                        },
                      },
                    }}
                  >
                    {enquiryTypes.map((et) => (
                      <MenuItem key={et.value} value={et.value}>{t(et.key)}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label={t("contact.messageLabel")}
                  value={form.message}
                  onChange={handleChange("message")}
                  required
                  fullWidth
                  multiline
                  rows={5}
                  sx={inputSx}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  className="btn-shimmer"
                  endIcon={<SendIcon sx={{ fontSize: "1rem !important", transition: "transform 0.25s ease" }} />}
                  sx={{
                    alignSelf:  "flex-start",
                    px:         5,
                    py:         1.7,
                    fontWeight: 700,
                    color:      tokens.colors.bg.base,
                    fontSize:   "0.85rem",
                    background: `linear-gradient(135deg, ${tokens.colors.primary.main} 0%, ${tokens.colors.primary.dark} 100%)`,
                    "&:hover .MuiButton-endIcon": { transform: "translateX(3px)" },
                  }}
                >
                  {t("contact.sendMessage")}
                </Button>
              </Box>
            </Box>
          </motion.div>

          {/* ── Location info ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Typography
              component="h2"
              sx={{
                fontFamily:    tokens.fonts.display,
                fontSize:      { xs: "1.8rem", md: "2.4rem" },
                textTransform: "uppercase",
                color:         tokens.colors.text.primary,
                lineHeight:    0.95,
                letterSpacing: "-0.01em",
                mb:            1,
              }}
            >
              Our{" "}
              <Box component="span" sx={{ color: tokens.colors.primary.main }}>
                {t("contact.locationHeading2")}
              </Box>
            </Typography>
            <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.88rem", mb: 5, lineHeight: 1.7 }}>
              {t("contact.locationSubtext")}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {locations.map((loc, i) => (
                <motion.div
                  key={loc.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Box
                    sx={{
                      p:            { xs: 3, md: 4 },
                      border:       `1px solid ${tokens.colors.border.subtle}`,
                      borderRadius: tokens.radius.xl,
                      bgcolor:      tokens.colors.bg.card,
                      position:     "relative",
                      overflow:     "hidden",
                      transition:   `all ${tokens.transitions.spring}`,
                      "&:hover": {
                        borderColor: tokens.colors.primary.main,
                        boxShadow:   tokens.shadows.gold,
                        transform:   "translateY(-4px)",
                      },
                    }}
                  >
                    {/* Top gold accent line on hover */}
                    <Box sx={{
                      position:   "absolute",
                      top:        0, left: 0, right: 0,
                      height:     "2px",
                      background: `linear-gradient(90deg, transparent, ${tokens.colors.primary.main}, transparent)`,
                      opacity:    0,
                      transition: `opacity ${tokens.transitions.normal}`,
                      ".MuiBox-root:hover &": { opacity: 1 },
                    }} />

                    {/* Location name watermark */}
                    <Box
                      aria-hidden="true"
                      sx={{
                        position:   "absolute",
                        bottom:     -12,
                        right:      12,
                        fontFamily: tokens.fonts.display,
                        fontSize:   "5rem",
                        color:      "transparent",
                        WebkitTextStroke: `1px ${tokens.colors.primary.main}`,
                        opacity:    0.05,
                        lineHeight: 1,
                        userSelect: "none",
                        pointerEvents: "none",
                        textTransform: "uppercase",
                      }}
                    >
                      {loc.name}
                    </Box>

                    <Typography
                      sx={{
                        fontFamily:    tokens.fonts.display,
                        fontSize:      "1.4rem",
                        textTransform: "uppercase",
                        color:         tokens.colors.text.primary,
                        letterSpacing: "-0.01em",
                        mb:            3,
                      }}
                    >
                      {loc.name}
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                        <Box sx={{
                          width:        32, height: 32,
                          borderRadius: "50%",
                          bgcolor:      tokens.colors.primary.glow,
                          border:       `1px solid ${tokens.colors.border.subtle}`,
                          display:      "flex",
                          alignItems:   "center",
                          justifyContent: "center",
                          flexShrink:   0,
                          mt:           0.1,
                        }}>
                          <LocationOnIcon sx={{ color: tokens.colors.primary.main, fontSize: "1rem" }} />
                        </Box>
                        <Box>
                          <Typography sx={{ color: tokens.colors.text.primary, fontSize: "0.9rem", fontWeight: 500 }}>
                            {loc.address}
                          </Typography>
                          <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.85rem" }}>
                            {loc.city}
                          </Typography>
                          <Box
                            component="a"
                            href={loc.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              display:        "inline-flex",
                              alignItems:     "center",
                              gap:            0.5,
                              color:          tokens.colors.primary.main,
                              fontSize:       "0.78rem",
                              textDecoration: "none",
                              mt:             0.5,
                              opacity:        0.8,
                              "&:hover":      { opacity: 1 },
                              transition:     tokens.transitions.fast,
                            }}
                          >
                            {t("contact.viewOnMap")}
                            <OpenInNewIcon sx={{ fontSize: "0.75rem" }} />
                          </Box>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                        <Box sx={{
                          width:        32, height: 32,
                          borderRadius: "50%",
                          bgcolor:      tokens.colors.primary.glow,
                          border:       `1px solid ${tokens.colors.border.subtle}`,
                          display:      "flex",
                          alignItems:   "center",
                          justifyContent: "center",
                          flexShrink:   0,
                          mt:           0.1,
                        }}>
                          <PhoneIcon sx={{ color: tokens.colors.primary.main, fontSize: "0.95rem" }} />
                        </Box>
                        <Box>
                          {loc.phones.map((phone) => (
                            <Typography
                              key={phone}
                              component="a"
                              href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                              sx={{
                                display:        "block",
                                color:          tokens.colors.text.secondary,
                                fontSize:       "0.9rem",
                                textDecoration: "none",
                                "&:hover":      { color: tokens.colors.primary.main },
                                transition:     tokens.transitions.fast,
                              }}
                            >
                              {phone}
                            </Typography>
                          ))}
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <Box sx={{
                          width:        32, height: 32,
                          borderRadius: "50%",
                          bgcolor:      tokens.colors.primary.glow,
                          border:       `1px solid ${tokens.colors.border.subtle}`,
                          display:      "flex",
                          alignItems:   "center",
                          justifyContent: "center",
                          flexShrink:   0,
                        }}>
                          <AccessTimeIcon sx={{ color: tokens.colors.primary.main, fontSize: "0.95rem" }} />
                        </Box>
                        <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.85rem" }}>
                          {loc.hours}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Box>
      </Container>

      <Snackbar
        open={sent}
        autoHideDuration={5000}
        onClose={() => setSent(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSent(false)}
          severity="success"
          sx={{
            bgcolor:      tokens.colors.dark.card,
            color:        tokens.colors.dark.textPrimary,
            border:       `1px solid ${tokens.colors.dark.borderLight}`,
            borderRadius: tokens.radius.md,
            boxShadow:    tokens.shadows.gold,
            "& .MuiAlert-icon": { color: tokens.colors.primary.main },
          }}
        >
          {t("contact.successMessage")}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactPage;
