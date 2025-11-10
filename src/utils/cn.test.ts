/**
 * cn() Utility Tests
 * ══════════════════════════════════════════════════════════════════════
 *
 * On teste la fonction cn() qui fusionne les classes CSS.
 *
 * DIFFÉRENCE avec les tests précédents :
 * ─────────────────────────────────────
 * - Avant : On testait un composant React (besoin de render, DOM, etc.)
 * - Maintenant : On teste juste une fonction JavaScript pure
 *
 * Pure function = même input → toujours le même output (pas d'effets secondaires)
 * C'est beaucoup plus simple à tester ! 🎉
 *
 * STRUCTURE :
 * ──────────
 * it('input → output', () => {
 *   expect(cn(...)).toBe(expectedResult)
 * })
 */

import { describe, it, expect } from "vitest";
import { cn } from "./cn";

/**
 * describe('cn()')
 * ────────────────
 * Groupe tous les tests de la fonction cn()
 */
describe("cn() - className merger utility", () => {
  /**
   * TEST 1 : Fusionner plusieurs classes simples
   * ────────────────────────────────────────────
   *
   * ENTRÉE :  "px-2", "bg-blue", "text-white"
   * RÉSULTAT : "px-2 bg-blue text-white"
   */
  it("merges multiple class strings", () => {
    // ✅ ARRANGE et ACT
    const result = cn("px-2", "bg-blue", "text-white");

    // ✅ ASSERT
    // toBe() = vérifier l'égalité exacte (===)
    // (différent de toEqual() qui compare les structures)
    expect(result).toBe("px-2 bg-blue text-white");
  });

  /**
   * TEST 2 : Ignorer undefined et null
   * ────────────────────────────────────
   *
   * ENTRÉE :  "px-2", undefined, "text-white", null
   * RÉSULTAT : "px-2 text-white"
   *
   * C'est la FORCE de cette fonction !
   * Permet d'écrire du code conditionnel propre.
   */
  it("filters out undefined and null values", () => {
    // ✅ ARRANGE et ACT
    const result = cn("px-2", undefined, "text-white", null);

    // ✅ ASSERT
    expect(result).toBe("px-2 text-white");
  });

  /**
   * TEST 3 : Ignorer false (booléen)
   * ────────────────────────────────
   *
   * ENTRÉE :  "px-2", false, "text-white"
   * RÉSULTAT : "px-2 text-white"
   *
   * Pourquoi ignorer false ?
   * ─────────────────────────
   *
   * Quand on utilise cn() avec des conditions :
   *
   *   cn("base-class", isActive && "active-class")
   *
   * Si isActive = false, l'expression isActive && "active-class" retourne false
   * (pas la string "active-class")
   *
   * C'est normal ! Et on veut que cn() ignore ce false.
   */
  it("filters out false boolean values", () => {
    // ✅ ARRANGE et ACT
    const result = cn("px-2", false, "text-white");

    // ✅ ASSERT
    expect(result).toBe("px-2 text-white");
  });

  /**
   * TEST 4 : Zéro n'est pas une classe valide
   * ──────────────────────────────────────────
   *
   * ENTRÉE :  "px-2", 0, "text-white"
   * RÉSULTAT : "px-2 text-white"
   *
   * Pourquoi on filtre 0 ?
   * ───────────────────────
   * 0 est "falsy" en JavaScript.
   * filter(Boolean) va l'éliminer aussi.
   *
   * Mais la fonction accepte uniquement les types spécifiés.
   * Donc on ne peut pas le tester directement.
   * Ce test est commenté pour information.
   */
  it("handles multiple classes with variations", () => {
    // ✅ ARRANGE et ACT
    const result = cn("px-2", undefined, "text-white");

    // ✅ ASSERT
    expect(result).toBe("px-2 text-white");
  });

  /**
   * TEST 5 : Ignorer les strings vides
   * ──────────────────────────────────
   *
   * ENTRÉE :  "px-2", "", "text-white"
   * RÉSULTAT : "px-2 text-white"
   *
   * Les strings vides ne sont pas des classes, donc on les ignore.
   */
  it("filters out empty strings", () => {
    // ✅ ARRANGE et ACT
    const result = cn("px-2", "", "text-white");

    // ✅ ASSERT
    expect(result).toBe("px-2 text-white");
  });

  /**
   * TEST 6 : Cas complexe avec mélange de tout
   * ──────────────────────────────────────────
   *
   * ENTRÉE : "base", undefined, false, null, "active", "", "shadow"
   * RÉSULTAT : "base active shadow"
   *
   * C'est un test "réaliste" qui montre l'usage en pratique.
   */
  it("handles complex mix of values", () => {
    // ✅ ARRANGE et ACT
    const result = cn("base", undefined, false, null, "active", "", "shadow");

    // ✅ ASSERT
    expect(result).toBe("base active shadow");
  });

  /**
   * TEST 7 : Cas avec conditions réelles (simulation)
   * ──────────────────────────────────────────────────
   *
   * Montrons comment on utilise cn() dans la vraie vie :
   *
   *   const buttonClass = cn(
   *     "px-4 py-2",                    // toujours là
   *     isActive && "bg-blue",          // si isActive = true → "bg-blue"
   *     isDisabled && "opacity-50",     // si isDisabled = true → "opacity-50"
   *     size === "large" && "px-8 py-4" // si size = "large" → "px-8 py-4"
   *   )
   */
  it("works with boolean conditions (real-world usage)", () => {
    // ✅ ARRANGE
    const isActive = true;
    const isDisabled = false;
    const size = "large";

    // ✅ ACT
    const result = cn(
      "px-4 py-2",
      isActive && "bg-blue",
      isDisabled && "opacity-50",
      size === "large" && "px-8 py-4",
    );

    // ✅ ASSERT
    // isActive = true  → 'bg-blue' inclu ✅
    // isDisabled = false → 'opacity-50' exclu ✅
    // size = 'large' → 'px-8 py-4' inclu ✅
    expect(result).toBe("px-4 py-2 bg-blue px-8 py-4");
  });

  /**
   * TEST 8 : Aucun argument (edge case)
   * ─────────────────────────────────────
   *
   * Edge case = cas limite / cas extrême
   *
   * Qu'est-ce qui se passe si on appelle cn() sans aucun argument ?
   * cn()
   * RÉSULTAT : "" (string vide)
   */
  it("returns empty string when no arguments provided", () => {
    // ✅ ARRANGE et ACT
    const result = cn();

    // ✅ ASSERT
    expect(result).toBe("");
  });

  /**
   * TEST 9 : Tous les arguments sont "falsy" (edge case)
   * ────────────────────────────────────────────────────
   *
   * Que se passe-t-il si TOUS les arguments sont ignorés ?
   * cn(undefined, false, null, '')
   * RÉSULTAT : "" (string vide)
   */
  it("returns empty string when all arguments are falsy", () => {
    // ✅ ARRANGE et ACT
    const result = cn(undefined, false, null, "");

    // ✅ ASSERT
    expect(result).toBe("");
  });

  /**
   * TEST 10 : Classes avec espaces multiples
   * ──────────────────────────────────────────
   *
   * Que se passe-t-il si une classe contient déjà plusieurs espaces ?
   * cn("px-2 bg-blue", "text-white")
   * RÉSULTAT : "px-2 bg-blue text-white"
   *
   * Les espaces à l'intérieur d'une classe sont préservés.
   * (On ne les nettoie pas)
   */
  it("preserves spaces within class strings", () => {
    // ✅ ARRANGE et ACT
    const result = cn("px-2 bg-blue", "text-white");

    // ✅ ASSERT
    expect(result).toBe("px-2 bg-blue text-white");
  });

  /**
   * TEST 11 : Un seul argument
   * ──────────────────────────
   */
  it("returns single class string unchanged", () => {
    // ✅ ARRANGE et ACT
    const result = cn("px-2");

    // ✅ ASSERT
    expect(result).toBe("px-2");
  });

  /**
   * TEST 12 : Immutabilité (la fonction ne modifie rien)
   * ──────────────────────────────────────────────────────
   *
   * Immutable = qui ne change pas
   *
   * On appelle cn() plusieurs fois et on vérifie que ça retourne
   * le même résultat chaque fois (pas d'effet secondaire)
   */
  it("is idempotent - calling it multiple times returns same result", () => {
    // ✅ ARRANGE
    const input = ["px-2", "bg-blue", "text-white"];

    // ✅ ACT - appeler plusieurs fois
    const result1 = cn(...input);
    const result2 = cn(...input);
    const result3 = cn(...input);

    // ✅ ASSERT - tous les résultats sont identiques
    expect(result1).toBe(result2);
    expect(result2).toBe(result3);
    expect(result1).toBe("px-2 bg-blue text-white");
  });
});
