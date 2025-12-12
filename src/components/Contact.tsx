import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import { motion } from "framer-motion";
import { tokens } from "../theme";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Create mailto link with form data
      const subject = encodeURIComponent(`New inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${
          formData.phone || "Not provided"
        }\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:newnanthuskitchen@gmail.com?subject=${subject}&body=${body}`;
      setSnackbarOpen(true);
    }
  };

  const locations = [
    {
      name: "Markham",
      address: "72-30 Karachi Dr",
      city: "Markham ON L3S 0B6",
    },
    {
      name: "Scarborough",
      address: "80 Nashdene Rd",
      city: "Scarborough ON M1V 5E4",
    },
  ];

  const textFieldStyles = {
    "& .MuiInputLabel-root": {
      color: tokens.colors.text.tertiary,
      "&.Mui-focused": { color: tokens.colors.primary.main },
    },
    "& .MuiOutlinedInput-root": {
      color: "white",
      "& fieldset": { borderColor: tokens.colors.border.light },
      "&:hover fieldset": { borderColor: tokens.colors.border.medium },
      "&.Mui-focused fieldset": { borderColor: tokens.colors.primary.main },
    },
    "& .MuiFormHelperText-root": {
      color: "#f44336",
    },
  };

  return (
    <Box
      component="section"
      id="contact"
      aria-label="Contact Us"
      sx={{
        py: { xs: 10, md: 15 },
        bgcolor: tokens.colors.neutral.black,
        position: "relative",
        borderTop: `1px solid ${tokens.colors.border.light}`,
        overflow: "hidden",
      }}
    >
      {/* Logo Watermark */}
      <Box
        sx={{
          position: "absolute",
          bottom: "-15%",
          left: "-10%",
          width: { xs: 350, md: 500 },
          height: { xs: 350, md: 500 },
          opacity: 0.02,
          zIndex: 0,
          pointerEvents: "none",
          transform: "rotate(-20deg)",
        }}
        aria-hidden="true"
      >
        <Box
          component="img"
          src="/new_nanthus_kitchen_logo.png"
          alt=""
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, md: 10 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Typography
                component="span"
                sx={{
                  color: tokens.colors.primary.main,
                  letterSpacing: "0.2em",
                  mb: 2,
                  display: "block",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Contact Us
              </Typography>
              <Typography
                component="h2"
                sx={{
                  color: "white",
                  fontWeight: 400,
                  textTransform: "uppercase",
                  mb: 6,
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  lineHeight: 1,
                  fontFamily: tokens.fonts.display,
                }}
              >
                Get in <br />
                <Box
                  component="span"
                  sx={{ color: tokens.colors.primary.main }}
                >
                  Touch
                </Box>
              </Typography>

              {/* Locations */}
              {locations.map((location, index) => (
                <Box key={index} sx={{ mb: 4, display: "flex", gap: 2 }}>
                  <LocationOnIcon
                    sx={{ color: tokens.colors.primary.main, mt: 0.5 }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        color: tokens.colors.text.tertiary,
                        fontSize: "0.75rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        mb: 0.5,
                      }}
                    >
                      {location.name}
                    </Typography>
                    <Typography sx={{ color: "white", fontSize: "1.1rem" }}>
                      {location.address}
                    </Typography>
                    <Typography
                      sx={{
                        color: tokens.colors.text.secondary,
                        fontSize: "1rem",
                      }}
                    >
                      {location.city}
                    </Typography>
                  </Box>
                </Box>
              ))}

              {/* Email */}
              <Box
                sx={{ mb: 4, display: "flex", gap: 2, alignItems: "center" }}
              >
                <EmailIcon sx={{ color: tokens.colors.primary.main }} />
                <Box>
                  <Typography
                    component="a"
                    href="mailto:newnanthuskitchen@gmail.com"
                    sx={{
                      color: "white",
                      fontSize: "1.1rem",
                      textDecoration: "none",
                      "&:hover": { color: tokens.colors.primary.main },
                    }}
                  >
                    newnanthuskitchen@gmail.com
                  </Typography>
                </Box>
              </Box>

              {/* Phone Numbers */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <PhoneIcon
                  sx={{ color: tokens.colors.primary.main, mt: 0.5 }}
                />
                <Box>
                  <Typography
                    component="a"
                    href="tel:416-299-1999"
                    sx={{
                      color: "white",
                      fontSize: "1.1rem",
                      textDecoration: "none",
                      display: "block",
                      mb: 0.5,
                      "&:hover": { color: tokens.colors.primary.main },
                    }}
                  >
                    416-299-1999
                  </Typography>
                  <Typography
                    component="a"
                    href="tel:416-388-4791"
                    sx={{
                      color: "white",
                      fontSize: "1.1rem",
                      textDecoration: "none",
                      display: "block",
                      mb: 0.5,
                      "&:hover": { color: tokens.colors.primary.main },
                    }}
                  >
                    416-388-4791
                  </Typography>
                  <Typography
                    component="a"
                    href="tel:289-554-5999"
                    sx={{
                      color: "white",
                      fontSize: "1.1rem",
                      textDecoration: "none",
                      display: "block",
                      "&:hover": { color: tokens.colors.primary.main },
                    }}
                  >
                    289-554-5999
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                  bgcolor: "rgba(255,255,255,0.02)",
                  border: `1px solid ${tokens.colors.border.light}`,
                  borderRadius: 2,
                  p: { xs: 3, md: 5 },
                }}
              >
                <Typography
                  component="h3"
                  sx={{
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: 500,
                    mb: 4,
                    fontFamily: tokens.fonts.display,
                  }}
                >
                  Send us a message
                </Typography>

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      required
                      sx={textFieldStyles}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      required
                      sx={textFieldStyles}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Phone Number (optional)"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      sx={textFieldStyles}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      required
                      sx={textFieldStyles}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{
                        px: 5,
                        py: 1.5,
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: tokens.colors.neutral.black,
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Opening your email client...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
