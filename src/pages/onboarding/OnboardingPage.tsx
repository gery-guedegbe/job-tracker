/**
 * OnboardingPage.tsx
 * --------------------------------------------
 * Page d’introduction interactive affichée lors du premier lancement de JobTrackr.
 * Objectifs :
 *  - Présenter les principales fonctionnalités de l’application sous forme de slides animées
 *  - Offrir la possibilité de charger des données d’exemple
 *  - Marquer la fin du tutoriel et rediriger vers le dashboard
 *
 * Technologies :
 *  - Framer Motion : animations fluides et progressives
 *  - React Router : navigation entre les pages
 *  - TailwindCSS : styles responsives et dégradés visuels
 */

import { useState } from "react";
import { useTranslation } from "../../lib/i18n";
import { ChevronRight, ChevronLeft, Kanban } from "lucide-react";

import { slides } from "../../constants";
import { useNavigate } from "react-router-dom";
import { Label } from "../../components/ui/Label";
import { Button } from "../../components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Checkbox } from "../../components/ui/Checkbox";
import { ProgressBar } from "../../components/ui/ProgressBar";

interface OnboardingProps {
  /** Callback exécuté à la fin du tutoriel (avec ou sans données d’exemple) */
  onComplete: (loadSampleData: boolean) => void;
}

/**
 * Composant principal de la page d’onboarding.
 * Utilise une série de “slides” définies dans `constants.ts`
 * pour présenter visuellement les fonctionnalités clés.
 */
function OnboardingPage({ onComplete }: OnboardingProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Index de la diapositive actuellement affichée
  const [currentSlide, setCurrentSlide] = useState(0);

  // Indique si l’utilisateur souhaite charger des données d’exemple
  const [loadSampleData, setLoadSampleData] = useState(false);

  /**
   * Passe à la diapositive suivante ou termine le tutoriel.
   */
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // À la dernière étape : on marque l’onboarding comme complété
      onComplete(loadSampleData);
      navigate("/dashboard");
    }
  };

  /**
   * Revient à la diapositive précédente.
   */
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Données de la slide active (titre, description, icône, composant de démo)
  const slide = slides[currentSlide];
  const Icon = slide.icon;
  const DemoComponent = slide.demo;

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* === Éléments d’arrière-plan animés === */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-10 right-10 h-64 w-64 rounded-full bg-blue-200/20 blur-3xl dark:bg-blue-500/10"
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-10 left-10 h-64 w-64 rounded-full bg-green-200/20 blur-3xl dark:bg-green-500/10"
      />

      {/* === Contenu principal === */}
      <div className="relative z-10 w-full max-w-5xl">
        {/* === En-tête de l’application === */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="mb-4 flex items-center justify-center gap-2"
          >
            {/* Logo minimaliste animé */}
            <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-xl shadow-lg">
              <Kanban className="text-primary-foreground h-7 w-7" />
            </div>

            {/* Nom de l’application */}
            <span className="text-3xl font-semibold">{t.navbar.appName}</span>
          </motion.div>

          {/* Slogan ou phrase d’introduction */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            {t.onboarding.slide1.description.split(".")[0]}
          </motion.p>
        </div>

        {/* === Barre de progression des étapes === */}
        <ProgressBar currentStep={currentSlide} totalSteps={slides.length} />

        {/* === Carte principale contenant le contenu dynamique === */}
        <motion.div
          layout
          className="bg-card/80 flex min-h-[550px] flex-col rounded-3xl border p-8 shadow-2xl backdrop-blur-xl md:p-12"
        >
          {/* Transition fluide entre les slides */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-1 flex-col"
            >
              {/* === Icône thématique === */}
              <div className="mb-6 flex justify-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className={`rounded-2xl bg-gradient-to-br p-6 ${slide.gradient} shadow-lg`}
                >
                  <Icon className="h-12 w-12 text-white" />
                </motion.div>
              </div>

              {/* === Titre et description === */}
              <div className="mb-8 text-center">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-3 text-3xl font-semibold"
                >
                  {slide.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-muted-foreground mx-auto max-w-2xl"
                >
                  {slide.description}
                </motion.p>
              </div>

              {/* === Démonstration interactive (mini composant animé) === */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <DemoComponent />
              </motion.div>

              {/* === Case à cocher pour charger des données d’exemple (dernière slide) === */}
              {currentSlide === slides.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-primary/5 border-primary/20 mt-8 flex items-center gap-3 rounded-xl border p-4"
                >
                  <Checkbox
                    id="sample-data"
                    checked={loadSampleData}
                    onCheckedChange={(checked) =>
                      setLoadSampleData(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="sample-data"
                    className="flex-1 cursor-pointer"
                  >
                    {t.onboarding.loadSampleData}
                  </Label>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* === Navigation inférieure (précédent / suivant + indicateurs) === */}
          <div className="mt-8 flex items-center justify-between border-t pt-6">
            {/* Bouton “Précédent” */}
            <Button
              variant="ghost"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              {t.common.back}
            </Button>

            {/* Indicateurs des slides (petits points dynamiques) */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-primary w-8"
                      : "bg-muted hover:bg-muted-foreground/30 w-2"
                  }`}
                />
              ))}
            </div>

            {/* Bouton “Suivant” ou “Commencer” selon la slide */}
            <Button onClick={nextSlide} className="gap-2">
              {currentSlide === slides.length - 1
                ? t.onboarding.getStarted
                : t.common.next}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* === Bouton “Passer l’introduction” (en bas de page) === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <Button
            variant="ghost"
            onClick={async () => {
              await onComplete(false);
              navigate("/dashboard");
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            {t.common.skip}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default OnboardingPage;
