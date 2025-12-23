import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { tokens } from "../theme";

interface LocationSelectionModalProps {
  open: boolean;
  onClose: () => void;
}

const locations = [
  {
    name: "Scarborough",
    address: "80 Nashdene Rd, Scarborough, ON",
    phone: "(416) 299 1999",
    orderLink:
      "https://www.eastserve.ca/ordering/restaurant/menu?company_uid=b26cb912-8916-4de5-ae9e-bdcab2c08fa8&restaurant_uid=548c1a41-011d-488a-8876-d7815c9181d7&facebook=true",
  },
  {
    name: "Markham",
    address: "72-30 Karachi Dr, Markham, ON",
    phone: "(289) 554 5999",
    orderLink:
      "https://www.eastserve.ca/ordering/restaurant/menu?company_uid=b26cb912-8916-4de5-ae9e-bdcab2c08fa8&restaurant_uid=d171d5c5-0412-4013-b588-c52b5513f592&facebook=true",
  },
];

const LocationSelectionModal = ({
  open,
  onClose,
}: LocationSelectionModalProps) => {
  const handleLocationSelect = (orderLink: string) => {
    window.open(orderLink, "_blank");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={false}
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: tokens.colors.neutral.black,
          color: "white",
          border: `1px solid ${tokens.colors.border.light}`,
          m: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: `1px solid ${tokens.colors.border.light}`,
          pb: 1.5,
          pt: 2,
          px: { xs: 2, md: 3 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "1.1rem", md: "1.5rem" },
            }}
          >
            Select Your Location
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: "white",
              p: { xs: 0.5, md: 1 },
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: { xs: "1.5rem", md: "1.75rem" } }} />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          p: { xs: 2, md: 3 },
          pb: { xs: 2, md: 3 },
          overflow: "visible",
        }}
      >
        <Typography
          sx={{
            color: tokens.colors.text.secondary,
            mb: 2,
            textAlign: "center",
            fontSize: { xs: "0.875rem", md: "1rem" },
          }}
        >
          Choose your nearest location to place an order
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {locations.map((location, index) => (
            <Box
              key={index}
              sx={{
                border: `2px solid ${tokens.colors.border.light}`,
                borderRadius: 2,
                p: 2,
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  borderColor: tokens.colors.primary.main,
                  bgcolor: "rgba(255, 107, 53, 0.05)",
                  transform: "translateY(-2px)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
              }}
              onClick={() => handleLocationSelect(location.orderLink)}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.5,
                  mb: 1.5,
                }}
              >
                <LocationOnIcon
                  sx={{
                    color: tokens.colors.primary.main,
                    fontSize: { xs: "1.5rem", md: "1.75rem" },
                    flexShrink: 0,
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 0.5,
                      fontSize: { xs: "1rem", md: "1.25rem" },
                    }}
                  >
                    {location.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: tokens.colors.text.secondary,
                      fontSize: { xs: "0.8rem", md: "1rem" },
                      lineHeight: 1.4,
                    }}
                  >
                    {location.address}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1.5,
                  pl: 4.5,
                }}
              >
                <PhoneIcon
                  sx={{
                    color: tokens.colors.text.tertiary,
                    fontSize: { xs: "1rem", md: "1.25rem" },
                  }}
                />
                <Typography
                  sx={{
                    color: tokens.colors.text.secondary,
                    fontSize: { xs: "0.8rem", md: "1rem" },
                  }}
                >
                  {location.phone}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  py: 1.25,
                  fontWeight: 600,
                  fontSize: { xs: "0.85rem", md: "1rem" },
                  color: tokens.colors.neutral.black,
                  textTransform: "none",
                }}
              >
                Order from {location.name}
              </Button>
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LocationSelectionModal;
