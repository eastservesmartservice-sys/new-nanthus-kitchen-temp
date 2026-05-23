import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
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
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";
import PageBanner from "../components/PageBanner";
import SectionHeading from "../components/SectionHeading";
import { contactEmail, locations, pageImages } from "../data/site";
import { apiPost } from "../lib/api";
import { tokens } from "../theme";

const enquiryTypes = ["General enquiry", "Catering request", "Feedback", "Careers", "Other"];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "", role: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedType, setSubmittedType] = useState("");
  const [apiError, setApiError] = useState<string | null>(null);

  const isCareers = form.type === "Careers";

  const changeText = (field: "name" | "email" | "phone" | "role" | "message") =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const changeType = (event: SelectChangeEvent<string>) => {
    setForm((current) => ({ ...current, type: event.target.value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setApiError(null);
    try {
      const subject = isCareers
        ? `Careers application: ${form.role || "Position not specified"}`
        : `${form.type}: ${form.name}`;
      const messageBody = isCareers
        ? `Position: ${form.role}\n\n${form.message}`
        : form.message;

      await apiPost("/contact", {
        name: form.name,
        email: form.email,
        ...(form.phone ? { phone: form.phone } : {}),
        subject,
        message: messageBody,
      });

      setSubmittedType(form.type);
      setSent(true);
      setForm({ name: "", email: "", phone: "", type: "", role: "", message: "" });
    } catch (e: unknown) {
      setApiError((e as Error).message ?? "Failed to send. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
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
              eyebrow={isCareers ? "Join the team" : "Message"}
              title={isCareers ? "Apply for a position" : "Send the details"}
              body={isCareers
                ? "Tell us about yourself and the role you're interested in. We'll be in touch if there's a good fit."
                : "For catering, include the date, guest count, pickup or service needs, and preferred dishes if you already know them."}
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

              {isCareers && (
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
                  <TextField
                    required
                    label="Position applying for"
                    placeholder="e.g. Kitchen hand, Cashier, Cook"
                    value={form.role}
                    onChange={changeText("role")}
                    InputProps={{ startAdornment: <WorkOutlineIcon sx={{ mr: 1, fontSize: "1.1rem", color: tokens.colors.text.tertiary }} /> }}
                  />
                  <TextField
                    label="Phone number"
                    type="tel"
                    placeholder="e.g. (416) 123-4567"
                    value={form.phone}
                    onChange={changeText("phone")}
                  />
                </Box>
              )}

              <TextField
                required
                multiline
                rows={6}
                label={isCareers ? "Tell us about yourself" : "Message"}
                placeholder={isCareers ? "Share your experience, availability, and why you'd like to join the team." : ""}
                value={form.message}
                onChange={changeText("message")}
              />

              {apiError && (
                <Alert severity="error" sx={{ borderRadius: tokens.radius.md }}>{apiError}</Alert>
              )}

              <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
                <Typography sx={{ color: tokens.colors.text.tertiary, fontSize: "0.8rem" }}>
                  {isCareers ? "We review all applications and respond to shortlisted candidates." : "We typically respond within 24 hours."}
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={submitting}
                  endIcon={submitting ? <CircularProgress size={16} color="inherit" /> : <SendIcon />}
                  sx={{
                    px: 4,
                    bgcolor: tokens.colors.text.primary,
                    color: tokens.colors.text.inverse,
                    "&:hover": { bgcolor: tokens.colors.primary.dark },
                    "&.Mui-disabled": { bgcolor: tokens.colors.text.primary, opacity: 0.6, color: tokens.colors.text.inverse },
                  }}
                >
                  {submitting ? "Sending…" : isCareers ? "Submit application" : "Send message"}
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
                <Stack direction="row" gap={1.5} alignItems="flex-start">
                  <Box sx={{ width: 34, height: 34, borderRadius: tokens.radius.sm, bgcolor: "rgba(245,166,35,0.12)", display: "grid", placeItems: "center", flexShrink: 0, mt: 0.2 }}>
                    <AccessTimeIcon sx={{ color: tokens.colors.primary.main, fontSize: "1rem" }} />
                  </Box>
                  <Box>
                    {locations.map((loc) => (
                      <Box key={loc.id} sx={{ mb: 0.8 }}>
                        <Typography sx={{ color: tokens.colors.dark.textPrimary, fontSize: "0.8rem", fontWeight: 700 }}>
                          {loc.name}
                        </Typography>
                        {loc.hours.map((line) => (
                          <Typography key={line} sx={{ color: tokens.colors.dark.textSecondary, fontSize: "0.82rem" }}>
                            {line}
                          </Typography>
                        ))}
                      </Box>
                    ))}
                  </Box>
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
          {submittedType === "Careers"
            ? "Application received — we'll be in touch with shortlisted candidates."
            : "Message sent — we'll be in touch within 24 hours."}
        </Alert>
      </Snackbar>
    </Box>
  );
}
