export function normalizeSkill(skill = '') {
  return skill.trim().toLowerCase();
}

export function normalizeCity(city = '') {
  return city.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function formatSkillList(skills = []) {
  return skills.join(', ');
}

export function getSharedSkills(sourceSkills = [], targetSkills = []) {
  const targetSet = new Set(targetSkills.map(normalizeSkill));
  return sourceSkills.filter((skill) => targetSet.has(normalizeSkill(skill)));
}

export function getDistanceLabel(currentCity, otherCity, index) {
  if (currentCity && otherCity && normalizeCity(currentCity) === normalizeCity(otherCity)) {
    return `${1.2 + index * 0.7} km`;
  }

  return `${6 + index * 1.5} km`;
}

function toPercent(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function createMatch(user, candidate, index = 0) {
  const candidateCanTeach = getSharedSkills(user.skillsWanted, candidate.skillsOffered);
  const userCanTeach = getSharedSkills(candidate.skillsWanted, user.skillsOffered);
  const sameCity = Boolean(user.city && candidate.city && normalizeCity(user.city) === normalizeCity(candidate.city));

  const userWantedCount = Math.max(user.skillsWanted.length, 1);
  const candidateWantedCount = Math.max(candidate.skillsWanted.length, 1);

  const learnCoverage = candidateCanTeach.length / userWantedCount;
  const teachCoverage = userCanTeach.length / candidateWantedCount;
  const isReciprocal = candidateCanTeach.length > 0 && userCanTeach.length > 0;
  const exactReciprocal =
    candidateCanTeach.length === user.skillsWanted.length &&
    userCanTeach.length === candidate.skillsWanted.length &&
    isReciprocal;

  const relevanceScore = candidateCanTeach.length * 5 + userCanTeach.length * 4 + (sameCity ? 2 : 0);

  if (!candidateCanTeach.length && !userCanTeach.length) {
    return null;
  }

  let compatibility;

  if (exactReciprocal) {
    compatibility = 100;
  } else {
    compatibility = toPercent(
      learnCoverage * 45 +
        teachCoverage * 35 +
        (isReciprocal ? 12 : 0) +
        (sameCity ? 8 : 0)
    );

    if (isReciprocal) {
      compatibility = Math.max(compatibility, 60);
    } else {
      compatibility = Math.max(compatibility, 25);
    }
  }

  return {
    id: `${user.id}-${candidate.id}`,
    candidate,
    sameCity,
    isReciprocal,
    exactReciprocal,
    relevanceScore,
    candidateCanTeach,
    userCanTeach,
    learnCoverage: toPercent(learnCoverage * 100),
    teachCoverage: toPercent(teachCoverage * 100),
    distance: getDistanceLabel(user.city, candidate.city, index),
    connectionModes: sameCity ? ['Offline', 'Online', 'Text'] : ['Online', 'Text'],
    compatibility,
  };
}

export function sortMatches(matches = []) {
  return [...matches].sort((left, right) => {
    if (left.compatibility !== right.compatibility) {
      return right.compatibility - left.compatibility;
    }

    if (left.isReciprocal !== right.isReciprocal) {
      return Number(right.isReciprocal) - Number(left.isReciprocal);
    }

    if (left.sameCity !== right.sameCity) {
      return Number(right.sameCity) - Number(left.sameCity);
    }

    return right.relevanceScore - left.relevanceScore;
  });
}
