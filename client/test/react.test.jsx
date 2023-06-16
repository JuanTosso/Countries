import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import Landing from "../src/components/Landing/Landing";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

describe("Landing", () => {
  afterEach(cleanup);

  it("debe renderizar", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    );
  });
});
