# Architecture de JobTrackr# Architecture Documentation

## Vue d'Ensemble Système## System Overview

JobTrackr est une **application single-page client-side** suivant une architecture **local-first offline-first**.JobTracker is built with a **local-first, client-side architecture** using modern React patterns and best practices.

```````

┌─────────────────────────────────────────────────────┐┌─────────────────────────────────────────────────────┐

│        Navigateur (Client)                           ││                  React Application                   │

├─────────────────────────────────────────────────────┤├─────────────────────────────────────────────────────┤

│                                                      ││                                                      │

│  ┌───────────────────────────────────────────────┐  ││  ┌──────────────┐  ┌──────────────┐  ┌────────────┐│

│  │  Layer Présentation (React Components)        │  ││  │   Pages      │  │ Components   │  │   Hooks    ││

│  │  ─────────────────────────────────────────    │  ││  │              │  │              │  │            ││

│  │  Pages (route-based) + Composants réutilisables│  ││  │ - Dashboard  │  │ - UI (Radix) │  │ - useState ││

│  │  (Button, Card, Dialog, etc.)                 │  ││  │ - Settings   │  │ - Modals     │  │ - useContext

│  └───────────────────────────────────────────────┘  ││  │ - Analytics  │  │ - Cards      │  │ - Custom   ││

│                         │                           ││  │ - Tasks      │  │ - Forms      │  │            ││

│                         ▼                           ││  └──────────────┘  └──────────────┘  └────────────┘│

│  ┌───────────────────────────────────────────────┐  ││         │                 │                 │       │

│  │  Layer État (State Management)                │  ││         └─────────────────┼─────────────────┘       │

│  │  ─────────────────────────────────────────    │  ││                           │                        │

│  │  • React Context (i18n)                       │  ││         ┌─────────────────▼─────────────────┐      │

│  │  • Hooks (useState, useEffect)               │  ││         │      State Management             │      │

│  │  • Props drilling (minimal)                   │  ││         │  (Context + Zustand)              │      │

│  └───────────────────────────────────────────────┘  ││         └─────────────────┬─────────────────┘      │

│                         │                           ││                           │                        │

│                         ▼                           ││         ┌─────────────────▼─────────────────┐      │

│  ┌───────────────────────────────────────────────┐  ││         │   Local Database (IndexedDB)      │      │

│  │  Layer Métier (Business Logic)                │  ││         │  - Applications                   │      │

│  │  ─────────────────────────────────────────    │  ││         │  - Tasks                          │      │

│  │  • Database module (db.ts)                    │  ││         │  - Notes                          │      │

│  │  • Validation (Zod schemas)                   │  ││         │  - Settings                       │      │

│  │  • i18n utils                                 │  ││         └─────────────────────────────────────┘      │

│  │  • Helper functions                           │  │└─────────────────────────────────────────────────────┘

│  └───────────────────────────────────────────────┘  │```

│                         │                           │

│                         ▼                           │---

│  ┌───────────────────────────────────────────────┐  │

│  │  IndexedDB Storage                            │  │## Directory Structure & Responsibilities

│  │  ─────────────────────────────────────────    │  │

│  │  • applications store                         │  │### `/src/components`

│  │  • tasks store                                │  │

│  │  • notes store                                │  │Reusable React components organized by type:

│  │  • settings store                             │  │

│  └───────────────────────────────────────────────┘  │```

│                                                      │components/

└─────────────────────────────────────────────────────┘├── ui/                 # Atomic UI components (Button, Card, etc.)

│   ├── Button.tsx

⚠️  Aucune connexion externe : offline-first│   ├── Card.tsx

```│   ├── Dialog.tsx

│   └── ...

---├── navbar/            # Navigation components

├── footer/            # Footer section

## Structure du Projet Détaillée├── onboarding/        # Onboarding flow components

└── ApplicationCard.tsx # Application-specific components

### `/src/pages` - Composants au Niveau des Routes```



Chaque page représente une **route** de l'application :**Responsibilities**:



```- Render UI elements

pages/- Handle local component state

├── dashboard/- Accept props from parent

│   └── Dashboard.tsx          # Page vide (redirige vers kanban)- Emit events via callbacks

│

├── kanban-view/**Example**:

│   └── KanbanViewPage.tsx      # Vue Kanban (colonnes par statuts)

│```typescript

├── list-view/interface ButtonProps {

│   └── ListView.tsx            # Vue Liste (tableau)  onClick: () => void

│  children: React.ReactNode

├── statistics/}

│   ├── StatisticsPage.tsx      # Page analytique

│   └── components/export const Button = ({ onClick, children }: ButtonProps) => (

│       ├── EmptyState.tsx  <button onClick={onClick}>{children}</button>

│       ├── MonthlyTrendChart.tsx)

│       ├── StatsOverview.tsx```

│       └── StatusDistributionChart.tsx

│### `/src/pages`

├── tasks/

│   ├── TasksPage.tsxPage-level components that represent routes:

│   ├── README.md

│   └── components/```

│       ├── DeleteTaskDialog.tsxpages/

│       ├── TaskItem.tsx├── dashboard/         # Main dashboard view

│       ├── TaskModal.tsx├── kanban-view/       # Kanban board view

│       ├── TaskSection.tsx├── list-view/         # List view

│       ├── TasksEmptyState.tsx├── statistics/        # Analytics page

│       └── TasksHeader.tsx├── tasks/             # Task management

│├── notes/             # Notes management

├── notes/├── settings/          # Settings page

│   ├── NotesPage.tsx└── onboarding/        # Onboarding page

│   ├── README.md```

│   └── components/

│       ├── DeleteNoteDialog.tsx**Responsibilities**:

│       ├── NoteCard.tsx

│       ├── NoteModal.tsx- Fetch/load data

│       ├── NotesEmptyState.tsx- Compose multiple components

│       ├── NotesHeader.tsx- Handle page-level state

│       └── NotesSearchBar.tsx- Implement routing logic

│

├── settings/### `/src/lib`

│   ├── SettingsPage.tsx

│   ├── README.mdCore business logic and utilities:

│   └── components/

│       ├── AboutCard.tsx```

│       ├── AppearanceSettings.tsxlib/

│       ├── ClearDataDialog.tsx├── db.ts              # IndexedDB abstraction layer

│       ├── DangerZone.tsx├── sample-data.ts     # Mock data for development

│       ├── GeneralSettings.tsx└── i18n/              # Internationalization

│       ├── LanguageSettings.tsx    ├── index.ts       # i18n setup

│       ├── ResetAppDialog.tsx    ├── context.tsx    # Context provider

│       ├── SaveButton.tsx    └── locales/

│       └── SettingsHeader.tsx        ├── en.ts      # English translations

│        └── fr.ts      # French translations

├── import_export/```

│   └── ImportExportPage.tsx    # Import/Export JSON

│**Responsibilities**:

└── onboarding/

    └── OnboardingPage.tsx      # Flow initial (carrousel)- Data persistence

```- Business logic

- External integrations (if any)

**Responsabilités** :

- Récupérer les données via la database### `/src/types`

- Composer plusieurs composants

- Gérer l'état au niveau pageTypeScript type definitions:

- Implémenter la logique métier

```typescript

### `/src/components` - Composants Réutilisables// types/index.ts

export interface Application {

```  id: string;

components/  title: string;

├── ui/                         # Composants atomiques (sans logique métier)  status: ApplicationStatus;

│   ├── button.tsx             # Bouton avec états  createdAt: Date;

│   ├── Card.tsx               # Conteneur générique  updatedAt: Date;

│   ├── CardExtended.tsx       # Card avec options}

│   ├── Input.tsx              # Champ texte

│   ├── Textarea.tsx           # Zone texte multi-ligneexport type ApplicationStatus =

│   ├── Dialog.tsx             # Modale générique  | "applied"

│   ├── AlertDialog.tsx        # Modale de confirmation  | "interview"

│   ├── Select.tsx             # Dropdown  | "rejected"

│   ├── Checkbox.tsx           # Case à cocher  | "accepted";

│   ├── Switch.tsx             # Toggle on/off```

│   ├── Label.tsx              # Étiquette formulaire

│   ├── Badge.tsx              # Badge (statuts)**Responsibilities**:

│   ├── ProgressBar.tsx        # Barre de progression

│   ├── Table.tsx              # Tableau- Define application domain models

│   ├── ScrollArea.tsx         # Zone scrollable- Ensure type safety across codebase

│   ├── Sheet.tsx              # Sidebar/drawer

│   └── SlideIndicator.tsx     # Indicateurs carousel### `/src/utils`

│

├── navbar/Utility functions:

│   └── Navbar.tsx             # Barre de navigation

│```typescript

├── footer/// utils/cn.ts - Classname merger for Tailwind

│   └── Footer.tsx             # Pied de pageexport const cn = (...classes: (string | undefined)[]): string =>

│  classes.filter(Boolean).join(" ");

├── onboarding/                # Composants spécifiques onboarding```

│   ├── AnalyticsDemo.tsx

│   ├── KanbanDemo.tsx**Responsibilities**:

│   ├── SlideCard.tsx

│   └── TasksDemo.tsx- Reusable helper functions

│- Pure functions without side effects

├── ApplicationCard.tsx        # Affichage candidature (mini)

└── ApplicationModal.tsx       # Formulaire candidature---

```

## State Management Strategy

**Responsabilités** :

- Rendre l'UI sans logique métier### Local Component State

- Accepter props en entrée

- Émettre des événements via callbacksFor simple, component-specific state:

- Pas de dépendances externes (sauf UI)

```typescript

### `/src/lib` - Logique Métierconst [isOpen, setIsOpen] = useState(false);

```

```

lib/### Context API

├── db.ts                      # Abstraction IndexedDB

│   ├── Database classFor deeply nested component props:

│   ├── CRUD Applications

│   ├── CRUD Tasks```typescript

│   ├── CRUD Notesconst I18nContext = createContext<I18nContextType>(null!);

│   ├── Settings managementconst useI18n = () => useContext(I18nContext);

│   ├── Import/Export```

│   └── Clear data

│### Zustand (Optional future enhancement)

├── sample-data.ts            # Données de démonstration

│   ├── sampleApplications[]For global application state:

│   ├── sampleTasks[]

│   └── loadSampleData()```typescript

│const useStore = create((set) => ({

└── i18n/                      # Internationalisation  applications: [],

    ├── context.tsx           # I18nProvider + useTranslation hook  addApplication: (app) =>

    ├── index.ts              # Exports publics    set((state) => ({

    ├── utils.ts              # getStatusLabel(), getStatusColor()      applications: [...state.applications, app],

    ├── locales/    })),

    │   ├── en.ts            # Traductions anglais}));

    │   └── fr.ts            # Traductions français```

    └── README.md            # Docs i18n

```### Props Drilling (Avoided)



**Responsabilités** :Keep component hierarchies shallow to avoid excessive prop passing.

- Opérations données

- Validation---

- Utilitaires métier

- Internationalisation## Data Flow



### `/src/types/index.ts` - Définitions TypeScript### User Action Flow



```typescript```

// Domaine métierUser Interaction

type ApplicationStatus = "to_apply" | "sent" | "followed_up" | ...    ↓

interface Application { ... }Event Handler (onClick, onChange, etc.)

interface Task { ... }    ↓

interface Note { ... }State Update (setState)

interface AppSettings { ... }    ↓

Re-render Component

// Configuration UI    ↓

interface STATUS_CONFIG { ... }Database Update (if needed)

```    ↓

Cache Invalidation (reload if needed)

---```



## Flux de Données### Example: Adding an Application



### 1. Initialisation (`App.tsx`)```typescript

// 1. User submits form

```const handleSubmit = (data: Application) => {

App Component Mounts  // 2. Validate data

    ↓  validate(data);

useEffect → db.init()

    ↓  // 3. Update database

Load settings from IndexedDB  await db.addApplication(data);

    ↓

Apply theme (light/dark)  // 4. Reload applications

    ↓  await loadApplications();

Check onboardingCompleted

    ├─ NO → Show OnboardingPage  // 5. Show feedback

    └─ YES → Show DashboardLayout  toast.success("Application added");

```};

```

### 2. Cycle Utilisateur Normal

---

```

User navigates to /kanban-view## Database Schema

    ↓

KanbanViewPage mounts### IndexedDB Structure

    ↓

useEffect → db.getApplications()```javascript

    ↓// Applications Store

Render applications by status (columns){

    ↓  keyPath: 'id',

User drags application or clicks  indexes: [

    ↓    { name: 'status', keyPath: 'status' },

Event handler (onClick, onChange)    { name: 'createdAt', keyPath: 'createdAt' },

    ↓    { name: 'updatedAt', keyPath: 'updatedAt' }

Call db.updateApplication() or db.deleteApplication()  ]

    ↓}

Reload applications data

    ↓// Tasks Store

Re-render with new data{

    ↓  keyPath: 'id',

Show toast success  indexes: [

```    { name: 'applicationId', keyPath: 'applicationId' },

    { name: 'completed', keyPath: 'completed' }

### 3. Ajouter/Éditer une Candidature  ]

}

```

User clicks "Add" ou clique sur ApplicationCard// Notes Store

    ↓{

handleAddApplication() or handleEditApplication()  keyPath: 'id',

    ↓  indexes: [

Open ApplicationModal (modal state → isOpen)    { name: 'applicationId', keyPath: 'applicationId' }

    ↓  ]

Set editingApplication (null pour nouveau)}

    ↓

User remplit le formulaire// Settings Store

    ↓{

Click "Save"  keyPath: 'key'

    ↓}

handleSaveApplication()```

    ├─ if editingApplication → db.updateApplication()

    └─ if null → db.addApplication()---

    ↓

db.getApplications() → reload## Component Communication

    ↓

toast.success() + close modal### Parent to Child

```

Use **props**:

### 4. Import/Export

```typescript

```<ApplicationCard

User goes to /import-or-export  application={app}

    ↓  onEdit={handleEdit}

Click "Export"  onDelete={handleDelete}

    ├─ db.exportData() → JSON/>

    └─ Télécharger fichier```



Click "Import"### Child to Parent

    ├─ Sélectionner fichier JSON

    ├─ db.importData(data)Use **callbacks**:

    └─ db.getApplications() → reload

``````typescript

const ApplicationCard = ({ onDelete, application }) => (

---  <button onClick={() => onDelete(application.id)}>Delete</button>

)

## State Management Détaillé```



### React Hooks (Locale)### Sibling Communication



```typescriptUse **Context API** or **lifted state**:

// Component state

const [isOpen, setIsOpen] = useState(false)```typescript

const [applications, setApplications] = useState<Application[]>([])const [selectedApp, setSelectedApp] = useState(null)

const [editingApp, setEditingApp] = useState<Application | null>(null)

<LeftPanel onSelect={setSelectedApp} />

// Side effects<RightPanel app={selectedApp} />

useEffect(() => {```

  loadApplications()

}, [])  // Run once on mount---

```

## Performance Optimization

### Context API (Global)

### Code Splitting

```typescript

// i18n ProviderRoutes are lazy-loaded:

<I18nProvider language="fr">

  <App />```typescript

</I18nProvider>const Dashboard = lazy(() => import('./pages/Dashboard'))

const Settings = lazy(() => import('./pages/Settings'))

// Usage in components

const t = useTranslation()// Use with Suspense

console.log(t.kanban.title)<Suspense fallback={<Loading />}>

```  <Dashboard />

</Suspense>

### Props (Component Communication)```



```typescript### Memoization

// Parent to child

<ApplicationCardPrevent unnecessary re-renders:

  application={app}

  onEdit={handleEdit}```typescript

  onDelete={handleDelete}export const ApplicationCard = React.memo(({ app }) => (

/>  <div>{app.title}</div>

))

// Child to parent via callback```

const ApplicationCard = ({ onDelete }) => (

  <button onClick={() => onDelete(id)}>Delete</button>### useMemo & useCallback

)

```For expensive computations:



---```typescript

const sortedApplications = useMemo(

## Database Design  () => applications.sort((a, b) => a.title.localeCompare(b.title)),

  [applications],

### IndexedDB Stores);



```javascriptconst handleDelete = useCallback((id: string) => db.deleteApplication(id), []);

// applications```

{

  keyPath: "id"      // Clé unique---

  // Contient : Application interface

}## Error Handling



// tasks### Try-Catch Pattern

{

  keyPath: "id"```typescript

  // Contient : Task interfacetry {

}  await db.addApplication(application);

  toast.success("Success");

// notes} catch (error) {

{  console.error("Error:", error);

  keyPath: "id"  toast.error("Failed to add application");

  // Contient : Note interface}

}```



// settings### Error Boundaries (Recommended)

{

  keyPath: "id"     // Toujours "app-settings"```typescript

  // Contient : AppSettings interfaceclass ErrorBoundary extends React.Component {

}  componentDidCatch(error, errorInfo) {

```    console.error(error, errorInfo)

  }

### Opérations CRUD

  render() {

```typescript    return this.state.hasError ? <ErrorFallback /> : this.props.children

// CREATE  }

await db.addApplication(app)    // throws si ID existe}

await db.addTask(task)```

await db.addNote(note)

---

// READ

const apps = await db.getApplications()## Testing Strategy

const tasks = await db.getTasks()

const notes = await db.getNotes()### Unit Tests

const settings = await db.getSettings()

Test individual functions/components:

// UPDATE

await db.updateApplication(app) // put() → insert ou update```typescript

await db.updateTask(task)describe('ApplicationCard', () => {

await db.updateNote(note)  it('should display application title', () => {

await db.updateSettings(settings)    const { getByText } = render(

      <ApplicationCard app={{ title: 'Google' }} />

// DELETE    )

await db.deleteApplication(id)    expect(getByText('Google')).toBeInTheDocument()

await db.deleteTask(id)  })

await db.deleteNote(id)})

```

// BULK

await db.clearAllData()         // ⚠️ Irreversible### Integration Tests

const data = await db.exportData()

await db.importData(data)Test component interactions:

```

```typescript

---it('should delete application on button click', async () => {

  const { getByRole } = render(<ApplicationList />)

## Routing (`App.tsx`)  await userEvent.click(getByRole('button', { name: /delete/i }))

  expect(getByText('Deleted')).toBeInTheDocument()

```typescript})

<BrowserRouter>```

  <Routes>

    {/* Onboarding */}---

    {!settings.onboardingCompleted ? (

      <Route path="*" element={<OnboardingPage />} />## Security Considerations

    ) : (

      <>### Input Validation

        {/* Redirect root to kanban */}

        <Route path="/" element={<Navigate to="/kanban-view" />} />Use **Zod** for runtime validation:



        {/* Main layout */}```typescript

        <Route path="/" element={<DashboardLayout />}>const ApplicationSchema = z.object({

          <Route path="kanban-view" element={<KanbanViewPage />} />  title: z.string().min(1),

          <Route path="list-view" element={<ListView />} />  company: z.string().min(1),

          <Route path="statistics" element={<StatisticsPage />} />  status: z.enum(["applied", "rejected", "accepted"]),

          <Route path="task" element={<TasksPage />} />});

          <Route path="notes" element={<NotesPage />} />```

          <Route path="import-or-export" element={<ImportExportPage />} />

          <Route path="settings" element={<SettingsPage />} />### XSS Prevention

        </Route>

      </>React escapes by default:

    )}

  </Routes>```typescript

</BrowserRouter>// Safe - React escapes user input

```<div>{userInput}</div>

```

---

### Data Privacy

## Composants Clés

All data stays on user's device (IndexedDB):

### ApplicationCard

```typescript

Affiche une candidature en miniature.// No external API calls for sensitive data

const apps = await db.getApplications();

**Props** :```

```typescript

application: Application---

onEdit: (app: Application) => void

onDelete: (id: string) => void## Development Best Practices

onStatusChange?: (id: string, status: ApplicationStatus) => void

```### 1. Always Use TypeScript



### ApplicationModal```typescript

// ✅ Good

Modale pour ajouter/éditer une candidature.interface Props {

  title: string;

**Props** :  onClick: () => void;

```typescript}

isOpen: boolean

onClose: () => void// ❌ Avoid

onSave: (app: Application) => voidfunction Component(props: any) {}

application?: Application | null```

```

### 2. Keep Components Small

### Navbar

Each component should have single responsibility:

Navigation principale avec links et toggle thème.

```typescript

**Props** :// ✅ Good - separated concerns

```typescript<ApplicationList />

// Aucun prop - utilise routing directement<ApplicationCard />

```<ApplicationForm />



### DashboardLayout// ❌ Avoid - too much logic

<Application />

Layout principal avec navbar + sidebar + outlet.```



**Structure** :### 3. Use Meaningful Names

```

<DashboardLayout>```typescript

  <Navbar />// ✅ Good

  <div layout>const handleApplicationDelete = (id: string) => {};

    <Sidebar navigation />

    <Outlet />  {/* Route content */}// ❌ Avoid

  </div>const handle = (id: string) => {};

  <Footer />```

</DashboardLayout>

```### 4. Avoid Prop Drilling



---```typescript

// ✅ Good - use Context

## Validation des Données<LanguageProvider>

  <App />

### Zod Schemas</LanguageProvider>



```typescript// ❌ Avoid - passing through multiple levels

const ApplicationSchema = z.object({<App language={language} />

  jobTitle: z.string().min(1, "Required"),```

  company: z.string().min(1),

  status: z.enum(["to_apply", "sent", "followed_up", ...]),### 5. Document Complex Logic

  applicationDate: z.string().date(),

  notes: z.string(),```typescript

  tags: z.array(z.string())// Calculate acceptance rate considering rejections

})const acceptanceRate = useMemo(() => {

  const total = applications.length;

// Validation  const accepted = applications.filter((a) => a.status === "accepted").length;

const result = ApplicationSchema.safeParse(formData)  return total > 0 ? (accepted / total) * 100 : 0;

if (!result.success) {}, [applications]);

  result.error.errors.forEach(err => console.log(err.message))```

} else {

  const validated = result.data---

}

```## Deployment Architecture



### Utilisation dans les Pages### Build Process



```typescript```

const handleSaveApplication = async (data: FormData) => {Source Code

  try {    ↓

    const validated = ApplicationSchema.parse(data)TypeScript Compilation

    await db.addApplication(validated)    ↓

    toast.success("Saved")ESLint & Prettier

  } catch (error) {    ↓

    toast.error("Invalid data")Vite Build (bundling & minification)

  }    ↓

}Production Bundle (dist/)

```    ↓

Deploy to Vercel

---```



## Internationalisation (i18n)### Runtime Environment



### Architecture- **Client**: Browser (all modern browsers supported)

- **Storage**: IndexedDB (built-in browser storage)

```typescript- **Hosting**: Vercel CDN (global distribution)

// Provider dans App.tsx

<I18nProvider language={settings.language}>---

  <App />

</I18nProvider>## Future Scalability



// Context en arrière-planIf the project grows:

const I18nContext = createContext<I18nContextType>(null!)

1. **Backend Integration**: Add Node.js + Express/Next.js

// Hook personnalisé2. **Authentication**: Implement user login

export const useTranslation = () => {3. **Cloud Database**: Move from IndexedDB to MongoDB/PostgreSQL

  const context = useContext(I18nContext)4. **Microservices**: Split into independent services

  if (!context) throw new Error("useTranslation doit être dans I18nProvider")5. **Scaling**: Use containerization (Docker) and orchestration (Kubernetes)

  return context.t

}---

```

This architecture prioritizes **simplicity, maintainability, and performance** for a medium-scale application.

### Structure des Traductions

```typescript
// fr.ts
export const fr = {
  common: {
    loading: "Chargement...",
    save: "Enregistrer",
    // ...
  },
  navbar: { /* ... */ },
  kanban: { /* ... */ },
  // ...
}

// en.ts
export const en = { /* same structure */ }
```

### Utilisation

```typescript
const MyComponent = () => {
  const t = useTranslation()
  return <h1>{t.common.loading}</h1>
}
```

---

## Performance Optimizations

### Code Splitting

Routes lazy-loadées via `React.lazy()` :

```typescript
const Dashboard = lazy(() => import('./pages/Dashboard'))

<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

**Impact** : Chaque route n'est chargée que si visitée.

### Memoization

```typescript
// Prevent re-renders
export const ApplicationCard = React.memo(({ app }) => (
  <div>{app.title}</div>
))

// Expensive computations
const sorted = useMemo(() => {
  return applications.sort((a, b) => ...)
}, [applications])

// Stable callbacks
const handleDelete = useCallback((id) => {
  db.deleteApplication(id)
}, [])
```

### Bundle Optimization

- **Vite** : Tree-shaking, minification, code splitting
- **TailwindCSS** : CSS purging (génère que ce qui est utilisé)
- **React** : Production build (remove devtools)
- **Vercel** : Gzip/Brotli compression

---

## Error Handling

### Try-Catch Pattern

```typescript
const loadApplications = async () => {
  try {
    const apps = await db.getApplications()
    setApplications(apps)
  } catch (error) {
    console.error("Load failed:", error)
    toast.error("Failed to load applications")
  }
}
```

### Error Boundaries (Future)

```typescript
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error("Error:", error)
    this.setState({ hasError: true })
  }

  render() {
    return this.state.hasError ? <ErrorFallback /> : this.props.children
  }
}
```

---

## Security

### Data Privacy

✅ **Local-First** : Toutes les données dans IndexedDB
✅ **No Backend** : Aucun serveur externe
✅ **No Tracking** : Pas d'analytics
✅ **HTTPS** : Enforced par Vercel

### Input Validation

✅ **Zod** : Runtime schema validation
✅ **React** : Automatic XSS escaping
✅ **TypeScript** : Compile-time type checking

### Secrets

❌ Never in code
✅ Use `.env.local` (not versioned)
✅ Vercel environment variables (production)

---

## Testing Strategy

### Unit Tests (Vitest)

```typescript
describe('ApplicationCard', () => {
  it('should render application title', () => {
    const { getByText } = render(
      <ApplicationCard app={{ jobTitle: 'Dev' }} />
    )
    expect(getByText('Dev')).toBeInTheDocument()
  })

  it('should call onDelete when delete clicked', async () => {
    const onDelete = vi.fn()
    const { getByRole } = render(
      <ApplicationCard onDelete={onDelete} />
    )
    await userEvent.click(getByRole('button', { name: /delete/i }))
    expect(onDelete).toHaveBeenCalled()
  })
})
```

### Philosophie

- ✅ Test behavior, pas implementation
- ✅ User-centric queries (getByRole, getByText)
- ✅ Avoid brittle tests
- ✅ Meaningful coverage

---

## Deployment Pipeline

### Build Process

```
Source Code (TS + JSX)
    ↓
TypeScript Compilation (tsc)
    ↓
ESLint Validation
    ↓
Vite Bundling
    ├─ Code splitting
    ├─ Minification
    ├─ Tree-shaking
    └─ CSS Purging
    ↓
Production Bundle (dist/)
    ├─ index.html
    ├─ assets/
    │   ├─ app.[hash].js
    │   ├─ app.[hash].css
    │   └─ vendor.[hash].js
    └─ favicon.svg
```

### Vercel Deployment

```
Push to main
    ↓
GitHub Actions trigger
    ↓
npm run build
    ↓
Deploy dist/ to Vercel CDN
    ↓
Production URL live
    ↓
Preview URLs for PRs
```

---

## Future Scalability

Si le projet grandit :

### Phase 1 : Backend Integration
```
Current: Client-only
  ↓
Add: REST API / GraphQL endpoint
   → Users table
   → Authentication (JWT)
   → Data sync
```

### Phase 2 : Cloud Database
```
Current: IndexedDB local
  ↓
Add: PostgreSQL / MongoDB
   → Multi-device sync
   → Real-time collaboration
```

### Phase 3 : Microservices
```
Split into services:
  → Auth service
  → Applications API
  → Analytics service
  → Notifications service
```

### Phase 4 : Containerization
```
Docker containers
  ↓
Kubernetes orchestration
  ↓
Auto-scaling
  ↓
Global distribution
```

---

## Best Practices Appliquées

### Code Quality
- ✅ TypeScript strict mode
- ✅ ESLint enforcement
- ✅ Prettier formatting
- ✅ Pre-commit hooks

### Architecture
- ✅ Separation of concerns
- ✅ Reusable components
- ✅ Single responsibility
- ✅ DRY principle

### Performance
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Memoization
- ✅ Local caching

### Developer Experience
- ✅ HMR (Hot Module Reload)
- ✅ Clear folder structure
- ✅ Path aliases
- ✅ Comprehensive docs

### Production Readiness
- ✅ Error handling
- ✅ Input validation
- ✅ Security measures
- ✅ Performance optimized

---

**Last Updated** : Novembre 2025
**Version** : 1.0.0
```````
