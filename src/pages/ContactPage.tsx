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
    mapLink: "https://maps.google.com/?q=30+Karachi+Dr,+Markham,+ON",
  },
];

const enquiryTypes = [
  "General Enquiry",
  "Catering Request",
  "Feedback",
  "Partnership",
  "Other",
];

const inputSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: tokens.colors.bg.base,
    borderRadius: tokens.radius.sm,
    "& fieldset": { borderColor: tokens.colors.border.subtle },
    "&:hover fieldset": { borderColor: tokens.colors.border.light },
    "&.Mui-focused fieldset": { borderColor: tokens.colors.primary.main },
  },
  "& .MuiInputLabel-root": { color: tokens.colors.text.tertiary },
  "& .MuiInputLabel-root.Mui-focused": { color: tokens.colors.primary.main },
  "& .MuiOutlinedInput-input": { color: tokens.colors.text.primary },
  "& .MuiSelect-icon": { color: tokens.colors.text.tertiary },
};

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", type: "", message: "" });
  };

  return (
    <Box sx={{ bgcolor: tokens.colors.bg.base }}>
      <PageBanner
        eyebrow="Get In Touch"
        title="Let's"
        highlight="Connect"
        subtitle="Questions, catering enquiries, or just want to say hello — we'd love to hear from you."
        watermark="Contact"
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
            <Typography
              component="h2"
              sx={{
                fontFamily:    tokens.fonts.display,
                fontSize:      { xs: "1.8rem", md: "2.25rem" },
                textTransform: "uppercase",
                color:         tokens.colors.text.primary,
                lineHeight:    0.95,
                letterSpacing: "-0.01em",
                mb: 1,
              }}
            >
              Send a{" "}
              <Box component="span" sx={{ color: tokens.colors.primary.main }}>Message</Box>
            </Typography>
            <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.88rem", mb: 5 }}>
              We typically respond within 24 hours.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3 }}>
                <TextField
                  label="Your Name"
                  value={form.name}
                  onChange={handleChange("name")}
                  required
                  fullWidth
                  sx={inputSx}
                />
                <TextField
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  required
                  fullWidth
                  sx={inputSx}
                />
              </Box>

              <FormControl fullWidth sx={inputSx}>
                <InputLabel>Enquiry Type</InputLabel>
                <Select
                  value={form.type}
                  label="Enquiry Type"
                  onChange={handleChange("type")}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: tokens.colors.bg.base,
                        border: `1px solid ${tokens.colors.border.subtle}`,
                        boxShadow: tokens.shadows.md,
                        "& .MuiMenuItem-root": {
                          color: tokens.colors.text.secondary,
                          "&:hover": { bgcolor: tokens.colors.bg.card, color: tokens.colors.text.primary },
                          "&.Mui-selected": { bgcolor: tokens.colors.primary.glow, color: tokens.colors.primary.main },
                        },
                      },
                    },
                  }}
                >
                  {enquiryTypes.map((t) => (
                    <MenuItem key={t} value={t}>{t}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Message"
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
                sx={{
                  alignSelf:  "flex-start",
                  px:         5,
                  py:         1.7,
                  fontWeight: 700,
                  color:      tokens.colors.bg.base,
                  fontSize:   "0.85rem",
                }}
              >
                Send Message
              </Button>
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
                fontSize:      { xs: "1.8rem", md: "2.25rem" },
                textTransform: "uppercase",
                color:         tokens.colors.text.primary,
                lineHeight:    0.95,
                letterSpacing: "-0.01em",
                mb: 1,
              }}
            >
              Our{" "}
              <Box component="span" sx={{ color: tokens.colors.primary.main }}>Locations</Box>
            </Typography>
            <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.88rem", mb: 5 }}>
              Walk in or call us directly.
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
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
                      borderRadius: tokens.radius.lg,
                      bgcolor:      tokens.colors.bg.card,
                      position:     "relative",
                      overflow:     "hidden",
                      transition:   `all ${tokens.transitions.spring}`,
                      "&:hover": {
                        borderColor: tokens.colors.border.medium,
                        boxShadow:   tokens.shadows.gold,
                        transform:   "translateY(-4px)",
                      },
                    }}
                  >
                    {/* Location name watermark */}
                    <Box
                      aria-hidden="true"
                      sx={{
                        position:   "absolute",
                        bottom:     -12,
                        right:      12,
                        fontFamily: tokens.fonts.display,
                        fontSize:   "5rem",
                        color:      tokens.colors.primary.main,
                        opacity:    0.06,
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
                        fontSize:      "1.3rem",
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
                        <LocationOnIcon sx={{ color: tokens.colors.primary.main, flexShrink: 0, fontSize: "1.1rem", mt: 0.15 }} />
                        <Box>
                          <Typography sx={{ color: tokens.colors.text.primary, fontSize: "0.9rem", fontWeight: 500 }}>{loc.address}</Typography>
                          <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.85rem" }}>{loc.city}</Typography>
                          <Typography
                            component="a"
                            href={loc.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color:          tokens.colors.primary.main,
                              fontSize:       "0.78rem",
                              textDecoration: "none",
                              opacity:        0.8,
                              "&:hover":      { opacity: 1 },
                            }}
                          >
                            View on map →
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                        <PhoneIcon sx={{ color: tokens.colors.primary.main, flexShrink: 0, fontSize: "1.1rem", mt: 0.15 }} />
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
                        <AccessTimeIcon sx={{ color: tokens.colors.primary.main, flexShrink: 0, fontSize: "1.1rem" }} />
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
            bgcolor: tokens.colors.bg.card,
            color: tokens.colors.text.primary,
            border: `1px solid ${tokens.colors.border.medium}`,
            "& .MuiAlert-icon": { color: tokens.colors.primary.main },
          }}
        >
          Message sent! We'll be in touch soon.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactPage;
