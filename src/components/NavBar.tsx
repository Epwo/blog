import Link from "next/link";
import Image from "next/image";
import * as Separator from "@radix-ui/react-separator";
import {} from "@radix-ui/react-icons";
import Input from "@/pages/ui/input/input";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
} from "@/pages/ui/select/select";
import React from "react";

const theme: "light" | "dark" = "dark"; // Replace with your theme logic

const NavBar = () => {
  // Use the getAssetPath helper for the logo
  const logoPath = "/swagman-SignB.svg"; // Adjust the path as needed
  return (
    <nav className="navbar">
      <Link href="/" className="navlink">
        <Image
          priority
          src={logoPath}
          alt="Logo"
          width={250}
          height={0}
          className="logo-navbar"
          style={{
            filter: theme === "dark" ? "invert(1)" : "none",
            height: "auto",
          }}
        />
      </Link>
      <Separator.Root
        className="SeparatorRoot"
        decorative
        orientation="vertical"
        style={{
          margin: "0 15px",
          minWidth: 1,
          width: 2,
          backgroundColor: theme === "dark" ? "white" : "black",
          height: "20px",
        }}
      />
      <div
        className="Text"
        style={{
          width: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Select>
          <SelectTrigger className="w-[180px]" defaultValue={"coding"}>
            <SelectValue placeholder="Choose the theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Choose the theme </SelectLabel>
              <SelectItem value="coding">Coding</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="misc">Miscelianous</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator.Root
        className="SeparatorRoot"
        decorative
        orientation="vertical"
        style={{
          margin: "0 15px",
          minWidth: 1,
          width: 2,
          backgroundColor: theme === "dark" ? "white" : "black",
          height: "20px",
        }}
      />
      <Input
        type="text"
        id="text"
        placeholder="Search..."
        style={{ minWidth: 50, marginLeft: 16 }}
      />
      {/* Add more links here as needed */}
    </nav>
  );
};
// Define the type for SelectItem props

// Add display name for React DevTools
SelectItem.displayName = "SelectItem";

export default NavBar;
