import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  MobileStepper,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const offerImages = [
  { src: "/1.jpeg", alt: "Kothu Special - Christmas Offer" },
  { src: "/2.jpeg", alt: "Lunch Special Combo - Christmas Offer" },
  { src: "/3.jpeg", alt: "All Time Favourites - Christmas Offer" },
  { src: "/4.jpeg", alt: "Traditional Sri Lanka Staples - Christmas Offer" },
  { src: "/5.jpeg", alt: "Biryani Combo - Christmas Offer" },
  { src: "/6.jpeg", alt: "Nanthu's Mediterranean Special - Christmas Offer" },
  { src: "/7.jpeg", alt: "Fried Rice Combo - Christmas Offer" },
];

const ChristmasOffersModal = () => {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const maxSteps = offerImages.length;

  useEffect(() => {
    // Show modal after a short delay
    const timer = setTimeout(() => {
      setOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 2,
          backgroundColor: "#000",
          position: "relative",
          overflow: "hidden",
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          zIndex: 1300,
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent
        sx={{
          p: 0,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#000",
          height: isMobile ? "100vh" : "85vh",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "calc(100% - 48px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            padding: isMobile ? "0 8px" : "0",
          }}
        >
          <img
            src={offerImages[activeStep].src}
            alt={offerImages[activeStep].alt}
            style={{
              maxWidth: isMobile ? "95%" : "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Box>

        <MobileStepper
          variant="dots"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{
            width: "100%",
            backgroundColor: "#000",
            "& .MuiMobileStepper-dot": {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            },
            "& .MuiMobileStepper-dotActive": {
              backgroundColor: "#ff6b35",
            },
          }}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              sx={{
                color: "#fff",
                "&.Mui-disabled": {
                  color: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{
                color: "#fff",
                "&.Mui-disabled": {
                  color: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default ChristmasOffersModal;
