/**
 * Button Component Tests
 * ══════════════════════════════════════════════════════════════════════
 *
 * On teste le composant Button de trois façons simples.
 *
 * STRUCTURE D'UN TEST :
 * ────────────────────
 *
 *   it('description de ce qu'on teste', () => {
 *     // 1. ARRANGE : Préparer les données
 *     // 2. ACT    : Faire l'action
 *     // 3. ASSERT : Vérifier le résultat
 *   })
 *
 * Cette structure s'appelle "AAA Pattern" ou "GWT Pattern"
 * G.I.V.E.N   W.H.E.N   T.H.E.N
 */

import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";
import { render } from "../../test/utils";

/**
 * describe()
 * ──────────
 * Groupe tous les tests du composant Button
 *
 * C'est comme créer une catégorie de tests.
 *
 * Quand tu lances les tests, tu verras :
 *
 *   ✓ Button Component
 *     ✓ renders with text
 *     ✓ calls onClick when clicked
 *     ✓ is disabled when disabled prop is true
 *
 * Les indentations visuelles aide à voir la hiérarchie.
 */
describe("Button Component", () => {
  /**
   * TEST 1 : Le bouton s'affiche avec du texte
   * ──────────────────────────────────────────────
   *
   * it() = "it should..." (une description anglaise)
   *
   * Exemple :
   *   it('renders with text', () => {})
   *   = "It should render with text"
   *   = "Ça devrait afficher avec du texte"
   */
  it("renders with text", () => {
    // ✅ ARRANGE : On prépare le test
    const buttonText = "Click me";

    // ✅ ACT : On affiche le composant
    render(<Button>{buttonText}</Button>);

    // ✅ ASSERT : On vérifie
    // screen.getByText()  = cherche un élément contenant ce texte
    // toBeInTheDocument() = vérifie qu'il existe dans le DOM
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });

  /**
   * TEST 2 : Le bouton appelle onClick quand on clique
   * ────────────────────────────────────────────────────
   *
   * C'est un test d'INTERACTION - on simule un vrai clic utilisateur !
   */
  it("calls onClick when clicked", async () => {
    // ✅ ARRANGE : Préparer un mock de la fonction onClick
    //
    // vi.fn() = créer une fonction "fantôme" qui enregistre les appels
    //
    // Analogie :
    // Imagine que tu mets une caméra de surveillance sur ta fonction.
    // Chaque fois qu'elle est appelée, la caméra l'enregistre !
    // Plus tard, tu peux vérifier : "combien de fois ça a été appelé ?"
    const handleClick = vi.fn();
    const buttonText = "Click me";

    // ✅ ACT : On affiche le bouton
    render(<Button onClick={handleClick}>{buttonText}</Button>);

    // ✅ ACT : On simule un clic utilisateur
    //
    // userEvent.click() = simule un vrai clic souris
    // (différent de fireEvent qui est plus "artificiel")
    //
    // async / await = parce que userEvent est asynchrone
    // (il attend la fin de l'animation, etc.)
    const user = userEvent.setup();
    await user.click(screen.getByText(buttonText));

    // ✅ ASSERT : Vérifier que la fonction a été appelée
    //
    // expect(handleClick).toHaveBeenCalled()
    // = "Vérifier que handleClick a été appelée une fois"
    expect(handleClick).toHaveBeenCalled();
  });

  /**
   * TEST 3 : Le bouton est disabled quand disabled={true}
   * ──────────────────────────────────────────────────────
   *
   * C'est un test d'ÉTAT - on vérifie les propriétés du DOM
   */
  it("is disabled when disabled prop is true", () => {
    // ✅ ARRANGE : On prépare le test
    const buttonText = "Disabled button";

    // ✅ ACT : On affiche le bouton avec disabled={true}
    render(<Button disabled>{buttonText}</Button>);

    // ✅ ASSERT : Vérifier que l'élément HTML a l'attribut disabled
    //
    // toBeDisabled() = est-ce que l'attribut disabled="true" existe ?
    expect(screen.getByText(buttonText)).toBeDisabled();
  });

  /**
   * BONUS TEST (optionnel) : Vérifier le variant
   * ──────────────────────────────────────────────
   *
   * On peut aussi tester si les variantes CSS sont appliquées.
   * Mais c'est plus complexe car c'est des classes TailwindCSS.
   *
   * Pour les classes CSS, on cherche généralement une classe spécifique :
   *
   *   expect(screen.getByText('Save')).toHaveClass('bg-primary')
   *
   * Mais attention ! Vitest ne peut pas garantir les styles calculés
   * (les vraies couleurs dans le navigateur), juste les classes HTML.
   */
  it("renders with default variant by default", () => {
    // ✅ ARRANGE et ACT
    render(<Button>Default Button</Button>);

    // ✅ ASSERT : Vérifie qu'une classe du variant default est présente
    // Notre composant ajoute "bg-primary" pour le variant default
    const button = screen.getByText("Default Button");
    expect(button).toHaveClass("bg-primary");
  });

  /**
   * BONUS TEST : Vérifier que le bouton n'est pas cliquable quand disabled
   * ───────────────────────────────────────────────────────────────────────
   */
  it("does not call onClick when disabled", async () => {
    // ✅ ARRANGE
    const handleClick = vi.fn();

    // ✅ ACT : Affiche un bouton disabled avec onClick
    render(
      <Button disabled onClick={handleClick}>
        Cannot click
      </Button>,
    );

    // ✅ ACT : Essayer de cliquer
    const user = userEvent.setup();
    await user.click(screen.getByText("Cannot click"));

    // ✅ ASSERT : Vérifier que la fonction n'a PAS été appelée
    //
    // .not = "ne pas" / "ne pas...être"
    expect(handleClick).not.toHaveBeenCalled();
  });

  /**
   * BONUS TEST : Vérifier les variants CSS
   * ──────────────────────────────────────
   */
  it("applies ghost variant styling", () => {
    // ✅ ARRANGE et ACT
    render(<Button variant="ghost">Ghost Button</Button>);

    // ✅ ASSERT : Vérifie qu'une classe du variant ghost est présente
    const button = screen.getByText("Ghost Button");
    expect(button).toHaveClass("hover:bg-muted");
  });

  /**
   * BONUS TEST : Vérifier les sizes
   * ─────────────────────────────────
   */
  it("applies sm size styling", () => {
    // ✅ ARRANGE et ACT
    render(<Button size="sm">Small Button</Button>);

    // ✅ ASSERT : Vérifie qu'une classe de size sm est présente
    const button = screen.getByText("Small Button");
    expect(button).toHaveClass("h-9");
  });
});
