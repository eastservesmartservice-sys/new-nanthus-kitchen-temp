import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import { tokens } from "../theme";

interface MenuItem {
  name: string;
  price: string;
  popular?: boolean;
}

interface MenuCategory {
  category: string;
  subtitle?: string;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    category: "Kothu",
    items: [
      { name: "Chicken Kothu", price: "$12 | NS $14", popular: true },
      { name: "Mutton Kothu", price: "$12 | NS $15" },
      { name: "Beef Kothu", price: "$12 | NS $15" },
      { name: "Veggie Kothu", price: "$10" },
      { name: "Egg Kothu", price: "$10" },
      { name: "Dolphin Kothu", price: "$14 | NS $16" },
      { name: "Seafood Kothu", price: "$14 | NS $16" },
      { name: "Fish Kothu", price: "$14 | NS $16" },
      { name: "Cheese Kothu", price: "$15", popular: true },
    ],
  },
  {
    category: "Grilled",
    subtitle: "All grilled items include Rice, Veggie, Fries or Salad",
    items: [
      { name: "Chicken Breast Skewer", price: "$15" },
      { name: "Chicken Dark Skewer", price: "$15" },
      { name: "Lamb Skewer", price: "$16" },
      { name: "Lamb Chop (4pc)", price: "$18", popular: true },
      { name: "Chicken Shawarma", price: "$15" },
      { name: "Beef Shawarma", price: "$15" },
      { name: "Beef Skewers", price: "$16" },
    ],
  },
  {
    category: "Chicken Dishes",
    items: [
      { name: "Chicken Devil", price: "$15", popular: true },
      { name: "Chicken 65", price: "$15", popular: true },
      { name: "Chili Chicken", price: "$15" },
      { name: "Tandoori Leg", price: "$4" },
      { name: "Butter Chicken", price: "$16", popular: true },
      { name: "Chicken Curry", price: "M $9 | L $15" },
      { name: "Chicken + Mix Veg", price: "$15" },
      { name: "Chicken Tikka Masala", price: "$15" },
      { name: "Jaffna Style Kozhi Pukkai", price: "$12" },
    ],
  },
  {
    category: "Seafood Dishes",
    items: [
      { name: "Mix Seafood Devil", price: "$18", popular: true },
      { name: "Shrimp Devil", price: "$17" },
      { name: "Squid Devil", price: "$17" },
      { name: "Chili With Shrimp & Calamari", price: "$18" },
      { name: "Fried Calamari", price: "$16" },
    ],
  },
  {
    category: "Beef Dishes",
    items: [
      { name: "Beef Devil", price: "$16", popular: true },
      { name: "Chili Beef", price: "$16" },
      { name: "Beef Pepper Fried", price: "$15" },
      { name: "Garlic Beef + Veg", price: "$15" },
    ],
  },
  {
    category: "Lamb Dishes",
    items: [
      {
        name: "Lamb Curry (Jaffna Style)",
        price: "M $10 | L $16",
        popular: true,
      },
    ],
  },
  {
    category: "Biryani",
    items: [
      { name: "Chicken Biryani", price: "$15", popular: true },
      { name: "Mutton Biryani", price: "$16" },
      { name: "Fish Biryani", price: "$17" },
      { name: "Seafood Biryani", price: "$17" },
      { name: "Veggie Biryani", price: "$14" },
    ],
  },
  {
    category: "Fried Rice",
    items: [
      { name: "Chicken Fried Rice", price: "$15" },
      { name: "Beef Fried Rice", price: "$16" },
      { name: "Seafood Fried Rice", price: "$17" },
      { name: "Veggie Fried Rice", price: "$13" },
      { name: "Shawarma Fried Rice", price: "$15", popular: true },
      { name: "Nasi Goreng Fried Rice", price: "$15" },
    ],
  },
  {
    category: "Noodles",
    items: [
      { name: "Chicken Noodles", price: "$15" },
      { name: "Beef Noodles", price: "$16" },
      { name: "Seafood Noodles", price: "$17" },
      { name: "Veggie Noodles", price: "$12" },
      { name: "Nanthu's Special Noodles", price: "$20", popular: true },
      { name: "Chicken & Shrimp Noodles", price: "$17" },
      { name: "Seafood & Chicken Noodles", price: "$18" },
    ],
  },
  {
    category: "Pasta",
    items: [
      { name: "Chicken & Shrimp Pasta", price: "$17" },
      { name: "Chicken Pasta", price: "$15" },
      { name: "Chicken, Shrimp, Sausage Pasta", price: "$18", popular: true },
      { name: "Seafood Pasta", price: "$17" },
      { name: "Shrimp & Sausage Pasta", price: "$17" },
      { name: "Veggie Pasta", price: "$13" },
    ],
  },
  {
    category: "Poutines",
    items: [
      { name: "Chicken Shawarma Poutine", price: "$14", popular: true },
      { name: "Beef Shawarma Poutine", price: "$15" },
      { name: "Jaffna Style Poutine", price: "$14" },
    ],
  },
  {
    category: "Short Eats",
    items: [
      { name: "Mutton Rolls", price: "$1.75", popular: true },
      { name: "Chicken Rolls", price: "$1.75", popular: true },
      { name: "Veggie Rolls", price: "$1.50" },
      { name: "Paruthurai Vadai", price: "$0.75" },
      { name: "Fish Cutlet", price: "$1" },
      { name: "Chicken Samosa", price: "$1" },
      { name: "Mutton Samosa", price: "$1" },
      { name: "Veg Samosa (3)", price: "$2" },
      { name: "Spring Rolls (3)", price: "$1" },
      { name: "Laddu", price: "$5" },
      { name: "Cake Box", price: "$7 | $13" },
    ],
  },
  {
    category: "Jaffna Specialties",
    items: [
      { name: "Banana Leaf - Chicken", price: "$16", popular: true },
      { name: "Banana Leaf - Veggie", price: "$14" },
      { name: "Banana Leaf - Mutton", price: "$17" },
      { name: "Banana Leaf - Any Seafood", price: "$17" },
      { name: "Banana Leaf - All Seafood", price: "$25" },
      { name: "Lamprais", price: "$17", popular: true },
      { name: "Veggie Puttu", price: "$10" },
      { name: "Seafood Puttu", price: "$14" },
      { name: "Veggie Idiyappam", price: "$10" },
      { name: "Seafood Idiyappam", price: "$14" },
      { name: "Roti", price: "$1.50" },
      { name: "Lemon Rice", price: "$12" },
      { name: "Seafood Combo", price: "$25" },
      { name: "Jaffna Style Kool", price: "$12", popular: true },
    ],
  },
  {
    category: "Sandwiches",
    items: [
      { name: "Chicken Shawarma with Pop", price: "$10" },
      { name: "Beef Shawarma with Pop", price: "$12" },
      { name: "Falafel Sandwich", price: "$8" },
      { name: "Chicken Shawarma Wrap", price: "$13", popular: true },
      { name: "Beef Shawarma Wrap", price: "$15" },
    ],
  },
  {
    category: "Kids Menu",
    items: [
      { name: "Chicken Fingers & Fries (3pc)", price: "$10" },
      { name: "Kids Chicken Pasta", price: "$10" },
      { name: "Kids Chicken Shawarma", price: "$8.99" },
      { name: "Kids Beef Shawarma", price: "$8.99" },
      { name: "Fish & Chips (2pc)", price: "$12" },
    ],
  },
  {
    category: "Drinks",
    items: [
      { name: "Tea", price: "$1.75" },
      { name: "Water", price: "$1.50" },
      { name: "Soft Drinks", price: "$2" },
      { name: "Mango Can", price: "$2.50" },
      { name: "Pineapple", price: "$2.50" },
      { name: "Apple Juice", price: "$2.50" },
      { name: "Orange Juice", price: "$2.50" },
      { name: "Necto", price: "$2.75" },
    ],
  },
];

const categories = ["All", ...menuData.map((cat) => cat.category)];

interface MenuCategoryAccordionProps {
  category: MenuCategory;
  defaultExpanded?: boolean;
}

const MenuCategoryAccordion: React.FC<MenuCategoryAccordionProps> = ({
  category,
  defaultExpanded = false,
}) => {
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      sx={{
        bgcolor: "transparent",
        backgroundImage: "none",
        boxShadow: "none",
        border: `1px solid ${tokens.colors.border.light}`,
        borderRadius: "8px !important",
        mb: 2,
        "&:before": { display: "none" },
        "&.Mui-expanded": {
          margin: "0 0 16px 0",
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon sx={{ color: tokens.colors.primary.main }} />
        }
        sx={{
          minHeight: 64,
          px: 3,
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.02)",
          },
          "& .MuiAccordionSummary-content": {
            my: 2,
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            component="h3"
            sx={{
              fontFamily: tokens.fonts.display,
              fontWeight: 500,
              color: "white",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              letterSpacing: "0.02em",
            }}
          >
            {category.category}
          </Typography>
          <Chip
            label={`${category.items.length} items`}
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.1)",
              color: tokens.colors.text.secondary,
              fontSize: "0.7rem",
              height: 22,
            }}
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 3, pb: 3 }}>
        {category.subtitle && (
          <Typography
            sx={{
              color: tokens.colors.primary.main,
              fontSize: "0.9rem",
              fontStyle: "italic",
              mb: 2,
              pb: 2,
              borderBottom: `1px solid ${tokens.colors.border.light}`,
            }}
          >
            {category.subtitle}
          </Typography>
        )}
        <TableContainer>
          <Table size="small">
            <TableBody>
              {category.items.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.02)",
                    },
                    "& td": {
                      borderBottom: `1px solid ${tokens.colors.border.light}`,
                      py: 1.5,
                    },
                    "&:last-child td": {
                      borderBottom: "none",
                    },
                  }}
                >
                  <TableCell sx={{ border: 0, pl: 0 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: { xs: "0.95rem", md: "1rem" },
                        }}
                      >
                        {item.name}
                      </Typography>
                      {item.popular && (
                        <Chip
                          label="Popular"
                          size="small"
                          sx={{
                            bgcolor: tokens.colors.primary.main,
                            color: tokens.colors.neutral.black,
                            fontWeight: 600,
                            fontSize: "0.6rem",
                            height: 18,
                          }}
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      border: 0,
                      pr: 0,
                      color: tokens.colors.primary.main,
                      fontWeight: 600,
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.price}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCategories =
    activeCategory === "All"
      ? menuData
      : menuData.filter((cat) => cat.category === activeCategory);

  const scrollToOrder = () => {
    const element = document.getElementById("take-away");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      component="section"
      id="menu"
      aria-label="Our Menu"
      sx={{
        py: { xs: 10, md: 15 },
        bgcolor: tokens.colors.neutral.black,
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Logo Watermark */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "-10%",
          width: { xs: 400, md: 600 },
          height: { xs: 400, md: 600 },
          opacity: 0.02,
          zIndex: 0,
          pointerEvents: "none",
          transform: "rotate(15deg)",
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
        {/* Section Header */}
        <Box sx={{ mb: { xs: 6, md: 10 }, textAlign: "center" }}>
          <Typography
            component="span"
            sx={{
              color: tokens.colors.primary.main,
              letterSpacing: "0.3em",
              mb: 2,
              display: "block",
              fontSize: "0.85rem",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            Our Selection
          </Typography>
          <Typography
            component="h2"
            sx={{
              color: "white",
              fontWeight: 400,
              textTransform: "uppercase",
              fontSize: { xs: "2.5rem", md: "4rem" },
              fontFamily: tokens.fonts.display,
              mb: 3,
            }}
          >
            The Menu
          </Typography>
          <Typography
            sx={{
              color: tokens.colors.text.secondary,
              maxWidth: 600,
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.7,
            }}
          >
            Authentic Jaffna flavors crafted with traditional recipes and the
            freshest ingredients
          </Typography>
        </Box>

        {/* Category Tabs */}
        <Box
          component="nav"
          aria-label="Menu categories"
          sx={{
            mb: { xs: 4, md: 8 },
            px: { xs: 2, md: 0 },
          }}
        >
          {/* Desktop: Horizontal scroll */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              gap: 1.5,
              flexWrap: "wrap",
            }}
          >
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? "contained" : "text"}
                aria-pressed={activeCategory === category}
                sx={{
                  color:
                    activeCategory === category
                      ? tokens.colors.neutral.black
                      : tokens.colors.text.secondary,
                  bgcolor:
                    activeCategory === category
                      ? tokens.colors.primary.main
                      : "transparent",
                  fontWeight: 600,
                  textTransform: "none",
                  letterSpacing: "0.02em",
                  fontSize: "0.8rem",
                  px: 2,
                  py: 0.75,
                  minHeight: 36,
                  borderRadius: 1,
                  transition: tokens.transitions.normal,
                  "&:hover": {
                    bgcolor:
                      activeCategory === category
                        ? tokens.colors.primary.dark
                        : "rgba(255,255,255,0.05)",
                    color:
                      activeCategory === category
                        ? tokens.colors.neutral.black
                        : "white",
                  },
                }}
              >
                {category}
              </Button>
            ))}
          </Box>

          {/* Mobile: Horizontal scroll */}
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              overflowX: "auto",
              "&::-webkit-scrollbar": {
                height: 6,
              },
              "&::-webkit-scrollbar-track": {
                bgcolor: "rgba(255,255,255,0.05)",
                borderRadius: 3,
              },
              "&::-webkit-scrollbar-thumb": {
                bgcolor: tokens.colors.primary.main,
                borderRadius: 3,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
                pb: 1,
                minWidth: "max-content",
              }}
            >
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  variant={
                    activeCategory === category ? "contained" : "outlined"
                  }
                  aria-pressed={activeCategory === category}
                  sx={{
                    color:
                      activeCategory === category
                        ? tokens.colors.neutral.black
                        : "white",
                    bgcolor:
                      activeCategory === category
                        ? tokens.colors.primary.main
                        : "transparent",
                    borderColor:
                      activeCategory === category
                        ? tokens.colors.primary.main
                        : tokens.colors.border.light,
                    fontWeight: 600,
                    textTransform: "none",
                    letterSpacing: "0.02em",
                    fontSize: "0.75rem",
                    px: 2,
                    py: 0.75,
                    minHeight: 36,
                    borderRadius: 20,
                    whiteSpace: "nowrap",
                    "&:hover": {
                      bgcolor:
                        activeCategory === category
                          ? tokens.colors.primary.dark
                          : "rgba(255,255,255,0.05)",
                      borderColor: tokens.colors.primary.main,
                    },
                  }}
                >
                  {category}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Menu Categories - Accordion Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {filteredCategories.map((category, index) => (
            <MenuCategoryAccordion
              key={category.category}
              category={category}
              defaultExpanded={index === 0}
            />
          ))}
        </motion.div>

        {/* Order CTA */}
        <Box sx={{ textAlign: "center", mt: { xs: 6, md: 10 } }}>
          <Typography
            sx={{
              color: tokens.colors.text.secondary,
              mb: 3,
              fontSize: "1rem",
            }}
          >
            Ready to taste authentic Jaffna cuisine?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={scrollToOrder}
            sx={{
              px: 5,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
              color: tokens.colors.neutral.black,
            }}
          >
            Order Online
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Menu;
