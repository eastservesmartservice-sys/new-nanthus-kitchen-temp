import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";
import PageBanner from "../components/PageBanner";
import SectionHeading from "../components/SectionHeading";
import { contactEmail, locations, pageImages } from "../data/site";
import { tokens } from "../theme";

const enquiryTypes = ["General enquiry", "Catering request", "Feedback", "Partnership", "Other"];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [sent, setSent] = useState(false);

  const changeText = (field: "name" | "email" | "message") => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const changeType = (event: SelectChangeEvent<string>) => {
    setForm((current) => ({ ...current, type: event.target.value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", type: "", message: "" });
  };

  return (
    <Box>
      <PageBanner
        eyebrow="Contact"
        title="Talk to"
        highlight="the kitchen"
        subtitle="Send a catering request, ask about pickup, or reach one of the counters directly."
        image={pageImages.contact}
        imageAlt="Restaurant interior"
      />

      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 6 }, py: { xs: 6, md: 9 } }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1.1fr 0.9fr" }, gap: { xs: 6, lg: 7 }, alignItems: "start" }}>

          {/* ── Form ──────────────────────────────────────────────────── */}
          <Box>
            <SectionHeading
              eyebrow="Message"
              title="Send the details"
              body="For catering, include the date, guest count, pickup or service needs, and preferred dishes if you already know them."
            />
            <Box
              component="form"
              onSubmit={submit}
              sx={{
                display: "grid",
                gap: 2,
                mt: 4,
                bgcolor: tokens.colors.bg.card,
                border: `1px solid ${tokens.colors.line.subtle}`,
                borderRadius: tokens.radius.xl,
                p: { xs: 3, md: 4 },
              }}
            >
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
                <TextField required label="Your name" value={form.name} onChange={changeText("name")} />
                <TextField required type="email" label="Email address" value={form.email} onChange={changeText("email")} />
              </Box>
              <FormControl required>
                <InputLabel>Enquiry type</InputLabel>
                <Select value={form.type} label="Enquiry type" onChange={changeType}>
                  {enquiryTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField required multiline rows={6} label="Message" value={form.message} onChange={changeText("message")} />
              <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
                <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.8rem" }}>
                  We typically respond within 24 hours.
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  sx={{
                    px: 4,
                    bgcolor: tokens.colors.text.primary,
                    color: tokens.colors.text.inverse,
                    "&:hover": { bgcolor: tokens.colors.primary.dark },
                  }}
                >
                  Send message
                </Button>
              </Stack>
            </Box>
          </Box>

          {/* ── Side info ─────────────────────────────────────────────── */}
          <Stack gap={2.5}>
            <Box
              sx={{
                bgcolor: tokens.colors.bg.inverse,
                color: tokens.colors.dark.textPrimary,
                borderRadius: tokens.radius.xl,
                p: { xs: 3, md: 4 },
                border: `1px solid ${tokens.colors.dark.borderSubtle}`,
              }}
            >
              <Typography sx={{ fontFamily: tokens.fonts.display, fontSize: "1.8rem", lineHeight: 1, mb: 2.5 }}>
                Direct contact
              </Typography>
              <Stack gap={1.8}>
                <Stack direction="row" gap={1.5} alignItems="center">
                  <Box sx={{ width: 34, height: 34, borderRadius: tokens.radius.sm, bgcolor: "rgba(245,166,35,0.12)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <MailOutlineIcon sx={{ color: tokens.colors.primary.main, fontSize: "1rem" }} />
                  </Box>
                  <Box component="a" href={`mailto:${contactEmail}`} sx={{ color: tokens.colors.dark.textSecondary, textDecoration: "none", fontSize: "0.9rem", "&:hover": { color: tokens.colors.dark.textPrimary } }}>
                    {contactEmail}
                  </Box>
                </Stack>
                <Stack direction="row" gap={1.5} alignItems="center">
                  <Box sx={{ width: 34, height: 34, borderRadius: tokens.radius.sm, bgcolor: "rgba(245,166,35,0.12)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <AccessTimeIcon sx={{ color: tokens.colors.primary.main, fontSize: "1rem" }} />
                  </Box>
                  <Typography sx={{ color: tokens.colors.dark.textSecondary, fontSize: "0.9rem" }}>
                    Daily 11:00 AM – 9:30 PM
                  </Typography>
                </Stack>
                <Stack direction="row" gap={1.5} alignItems="center">
                  <Box sx={{ width: 34, height: 34, borderRadius: tokens.radius.sm, bgcolor: "rgba(25,118,111,0.12)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <CheckCircleOutlineIcon sx={{ color: tokens.colors.secondary.main, fontSize: "1rem" }} />
                  </Box>
                  <Typography sx={{ color: tokens.colors.dark.textSecondary, fontSize: "0.9rem" }}>
                    Usually responds within 24 hours
                  </Typography>
                </Stack>
              </Stack>
            </Box>

            {locations.map((location) => {
              const isPrimary = location.accent === "tomato";
              const accent = isPrimary ? tokens.colors.primary.main : tokens.colors.secondary.main;
              return (
                <Box
                  key={location.id}
                  sx={{
                    bgcolor: tokens.colors.bg.card,
                    border: `1px solid ${tokens.colors.line.subtle}`,
                    borderRadius: tokens.radius.xl,
                    p: { xs: 2.5, md: 3 },
                    transition: tokens.transitions.fast,
                    "&:hover": { borderColor: accent },
                  }}
                >
                  <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1.5 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: accent }} />
                    <Typography sx={{ fontFamily: tokens.fonts.display, fontSize: "1.6rem", lineHeight: 1 }}>{location.name}</Typography>
                  </Stack>
                  <Stack gap={1.2}>
                    <Stack direction="row" gap={1.2} alignItems="flex-start">
                      <LocationOnIcon sx={{ color: accent, fontSize: "1rem", mt: 0.25, flexShrink: 0 }} />
                      <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: "0.9rem" }}>{location.address}</Typography>
                        <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.82rem" }}>{location.city}</Typography>
                      </Box>
                    </Stack>
                    {location.phones.map((phone) => (
                      <Stack key={phone} direction="row" gap={1.2} alignItems="center">
                        <PhoneIcon sx={{ color: accent, fontSize: "1rem", flexShrink: 0 }} />
                        <Box component="a" href={`tel:${phone.replace(/\D/g, "")}`} sx={{ color: tokens.colors.text.secondary, textDecoration: "none", fontSize: "0.88rem", "&:hover": { color: tokens.colors.text.primary } }}>
                          {phone}
                        </Box>
                      </Stack>
                    ))}
                    <Button
                      component="a"
                      href={location.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      endIcon={<OpenInNewIcon />}
                      size="small"
                      sx={{
                        alignSelf: "flex-start",
                        mt: 1,
                        borderColor: tokens.colors.line.light,
                        color: tokens.colors.text.secondary,
                        "&:hover": { borderColor: accent, color: accent },
                      }}
                    >
                      View on map
                    </Button>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Container>

      <Snackbar open={sent} autoHideDuration={4500} onClose={() => setSent(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setSent(false)} severity="success" sx={{ borderRadius: tokens.radius.lg }}>
          Message sent — we'll be in touch within 24 hours.
        </Alert>
      </Snackbar>
    </Box>
  );
}
