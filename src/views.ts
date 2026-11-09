import { achievements, education, experience, internships, moreProjects, projects, simulations, skills } from './data'

export type View =
  | 'overview'
  | 'about'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'achievements'
  | 'education'
  | 'contact'
  | 'ask'

export const views: { id: View; label: string; tool: string; args?: string; result: () => string }[] = [
  { id: 'overview', label: 'overview', tool: 'read_profile', result: () => 'profile loaded' },
  { id: 'about', label: 'about', tool: 'get_about', args: 'live=true', result: () => 'live' },
  {
    id: 'experience',
    label: 'experience',
    tool: 'get_experience',
    args: 'order="latest"',
    result: () => `${experience.length + internships.length + simulations.length} missions`,
  },
  { id: 'projects', label: 'projects', tool: 'list_projects', result: () => `${projects.length + moreProjects.length} quests` },
  { id: 'skills', label: 'skills', tool: 'get_skills', args: 'view="loadout"', result: () => `${skills.reduce((n, g) => n + g.items.length, 0)} skills` },
  { id: 'achievements', label: 'achievements', tool: 'get_achievements', result: () => `${achievements.length} unlocked` },
  { id: 'education', label: 'education', tool: 'get_education', result: () => `${education.length} degrees` },
  { id: 'contact', label: 'contact', tool: 'get_contact', result: () => 'open to roles' },
  { id: 'ask', label: 'ask', tool: 'ask_agent', args: 'demo=true', result: () => 'ready' },
]

export function viewFromHash(): View | null {
  const h = window.location.hash.slice(1)
  return views.find((v) => v.id === h)?.id ?? null
}
