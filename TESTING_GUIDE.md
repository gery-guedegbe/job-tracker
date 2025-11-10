# Guide Tests et Coverage

Ce document explique comment mettre en place et maintenir une **suite de tests robuste**.

## Vue d'Ensemble

Le projet utilise :

- **Vitest** : Framework de test ultra-rapide (compatible Jest)
- **React Testing Library** : Teste les composants comme l'utilisateur les utilise
- **Coberture** : Rapports de couverture

---

## Installation des Dépendances

Les dépendances sont **déjà installées**, mais voici pour référence :

```bash
npm install --save-dev \
  vitest@3.2.4 \
  @testing-library/react@16.3.0 \
  @testing-library/jest-dom@6.9.1 \
  @vitejs/plugin-react@5.0.4
```

---

## Structure des Tests

```
src/
├── test/
│   ├── setup.ts             # Configuration Vitest
│   └── utils.tsx            # Custom render utilities
│
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── button.test.tsx  # Test du Button
│   │   └── ...
│   └── ...
│
└── lib/
    ├── db.ts
    ├── db.test.ts           # Tests de la database
    └── ...
```

---

## Configuration : `vitest.config.ts`

Créer ce fichier à la racine :

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json"],
      exclude: ["node_modules/", "src/test/"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@lib": path.resolve(__dirname, "./src/lib"),
    },
  },
});
```

---

## Setup : `src/test/setup.ts`

```typescript
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

// Nettoyer après chaque test
afterEach(() => {
  cleanup();
});
```

---

## Utilities : `src/test/utils.tsx`

```typescript
import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Wrapper pour les providers (i18n, etc.)
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    // Ajouter les providers nécessaires ici
    <>{children}</>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
```

---

## Exemple de Tests

### Test 1 : Composant Button

Créer `src/components/ui/button.test.tsx` :

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import { Button } from './button'

describe('Button Component', () => {

  it('should render with text', () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    const button = screen.getByRole('button')
    button.click()

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('should have correct aria attributes', () => {
    render(
      <Button aria-label="Submit form">
        Submit
      </Button>
    )

    const button = screen.getByLabelText('Submit form')
    expect(button).toBeInTheDocument()
  })
})
```

### Test 2 : Composant Card

Créer `src/components/ui/Card.test.tsx` :

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { Card } from './Card'

describe('Card Component', () => {

  it('should render children', () => {
    render(
      <Card>
        <h2>Card Title</h2>
      </Card>
    )

    expect(screen.getByText('Card Title')).toBeInTheDocument()
  })

  it('should have correct classes', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.firstChild

    expect(card).toHaveClass('rounded-lg')
    expect(card).toHaveClass('border')
  })
})
```

### Test 3 : Application Logic

Créer `src/lib/db.test.ts` :

```typescript
import { describe, it, expect, beforeEach } from "vitest";
import { db } from "./db";
import type { Application } from "@types";

describe("Database", () => {
  beforeEach(async () => {
    await db.init();
    await db.clearAllData();
  });

  it("should add and retrieve applications", async () => {
    const app: Application = {
      id: "test-1",
      jobTitle: "Developer",
      company: "Tech Corp",
      status: "sent",
      applicationDate: "2025-11-10",
      notes: "",
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.addApplication(app);
    const apps = await db.getApplications();

    expect(apps).toHaveLength(1);
    expect(apps[0].jobTitle).toBe("Developer");
  });

  it("should update application", async () => {
    const app: Application = {
      id: "test-1",
      jobTitle: "Developer",
      company: "Tech Corp",
      status: "sent",
      applicationDate: "2025-11-10",
      notes: "Initial",
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.addApplication(app);

    const updated = { ...app, notes: "Updated", status: "interview" as const };
    await db.updateApplication(updated);

    const apps = await db.getApplications();
    expect(apps[0].notes).toBe("Updated");
    expect(apps[0].status).toBe("interview");
  });

  it("should delete application", async () => {
    const app: Application = {
      id: "test-1",
      jobTitle: "Developer",
      company: "Tech Corp",
      status: "sent",
      applicationDate: "2025-11-10",
      notes: "",
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.addApplication(app);
    await db.deleteApplication("test-1");

    const apps = await db.getApplications();
    expect(apps).toHaveLength(0);
  });
});
```

---

## Scripts de Test

### Dans `package.json`

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest --run",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### Exécution

```bash
# Mode watch (re-run on change)
npm run test

# Une exécution
npm run test -- --run

# Interface visuelle
npm run test:ui

# Rapport de couverture
npm run test:coverage
```

---

## Stratégie de Couverture

### Objectifs

| Type           | Coverage | Stratégie                  |
| -------------- | -------- | -------------------------- |
| **Statements** | 70%      | Couvrir logique principale |
| **Branches**   | 60%      | Tester if/else clés        |
| **Functions**  | 80%      | Tester exports publics     |
| **Lines**      | 75%      | Couvrir code actif         |

### Rapports

```bash
# Générer rapport
npm run test:coverage

# Résultat
File                      | % Stmts | % Branches | % Funcs | % Lines
--------------------------|---------|-----------|---------|--------
All files                 |   75.2  |    62.1   |   80.3  |   74.9
 src/components/ui/       |   85.0  |    75.0   |   90.0  |   84.5
 src/lib/db.ts           |   82.3  |    70.0   |   85.7  |   81.8
 src/utils/              |   95.0  |   100.0   |  100.0  |   95.0
```

---

## Best Practices

### ✅ À Faire

```typescript
// ✅ Bon - Tester le comportement utilisateur
it('should submit form on button click', async () => {
  render(<Form />)
  const input = screen.getByRole('textbox')
  const button = screen.getByRole('button', { name: /submit/i })

  await userEvent.type(input, 'data')
  await userEvent.click(button)

  expect(mockSubmit).toHaveBeenCalledWith('data')
})

// ✅ Bon - Utiliser queries utilisateur
const button = screen.getByRole('button', { name: /submit/i })

// ✅ Bon - Tester les cas edge
it('should handle empty input', () => { ... })
```

### ❌ À Éviter

```typescript
// ❌ Mauvais - Tester l'implémentation
it("should set state to true", () => {
  // Dépend de l'implémentation interne
});

// ❌ Mauvais - Selectors fragiles
const button = screen.getByTestId("my-button"); // vs getByRole

// ❌ Mauvais - Couverture fausse
// 100% coverage ≠ bonnes tests
```

---

## Intégration CI/CD

Dans `.github/workflows/ci.yml` :

```yaml
- name: Run tests
  run: npm run test -- --run

- name: Generate coverage
  if: always()
  run: npm run test:coverage

- name: Upload coverage to codecov
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/coverage-final.json
    flags: unittests
    fail_ci_if_error: true
```

---

## Debug les Tests

### Mode verbose

```bash
npm run test -- --reporter=verbose
```

### Test spécifique

```bash
npm run test -- button.test.tsx
```

### Watch un fichier

```bash
npm run test -- --watch src/lib/db.test.ts
```

### Pause sur erreur

```typescript
it('debug test', () => {
  render(<Component />)
  debugger  // Pause ici
  // ...
})

npm run test -- --inspect
```

---

## Ressources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Arrange-Act-Assert Pattern](https://github.com/testdouble/given2/wiki/Arrange-Act-Assert)

---

**Last Updated** : Novembre 2025
