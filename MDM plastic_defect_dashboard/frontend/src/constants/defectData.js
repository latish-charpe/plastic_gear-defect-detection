// defectData.js — All 16 defect classes for the Plastic Gear Surface Defect Dataset
// Used by DefectClassGrid, ProcessCorrection fallback, and DetectionTable

export const DEFECT_CLASSES = [
  {
    id: "broken",
    name: "Broken",
    description: "Cracked, broken, or snapped gear tooth, rim, or hub.",
    possible_cause:
      "Part was pushed out before it fully cooled, ejection pins pushed too hard, or plastic got stuck in the mold.",
    suggested_action:
      "Allow more cooling time so the part hardens, reduce ejection speed and force, and check if the mold surface is smooth.",
  },
  {
    id: "bulge",
    name: "Bulge",
    description: "Swollen or raised bump on the gear face or wall.",
    possible_cause:
      "Part was removed while the inside was still soft, or trapped air and pressure caused the surface to swell.",
    suggested_action:
      "Increase cooling time, reduce holding pressure, and clean the mold air vents.",
  },
  {
    id: "burn",
    name: "Burn",
    description: "Dark brown or black charred burn mark on the plastic surface.",
    possible_cause:
      "Trapped air got squeezed and overheated inside the mold, or the plastic melt temperature was too high.",
    suggested_action:
      "Clean and open mold air vents, slow down injection speed near the end, and lower barrel temperature.",
  },
  {
    id: "damage",
    name: "Damage",
    description: "Scratches, gouges, cuts, or dents on the gear.",
    possible_cause:
      "Part hit the mold during ejection, the robot arm gripped it too hard, or parts bumped together in the collection bin.",
    suggested_action:
      "Adjust robot arm alignment, inspect mold for rough metal edges, and add soft foam padding inside collection bins.",
  },
  {
    id: "darkspot",
    name: "Darkspot",
    description: "Small black or dark speck embedded in the plastic.",
    possible_cause:
      "Burnt plastic residue stuck in the machine nozzle, or dirty plastic raw material mixed with dust.",
    suggested_action:
      "Clean and purge the machine barrel, wipe the nozzle tip clean, and make sure fresh plastic granules are used.",
  },
  {
    id: "dirt",
    name: "Dirt",
    description: "Foreign dust particles or oily grease marks on the surface.",
    possible_cause:
      "Dust from the room settled in the mold, or grease leaked from moving mold pins onto the part.",
    suggested_action:
      "Wipe and clean the mold cavity, keep the material hopper covered, and do not use excess grease on ejector pins.",
  },
  {
    id: "flash",
    name: "Flash",
    description: "Thin extra plastic sheet sticking out along the edges or seams.",
    possible_cause:
      "Plastic was injected with too much pressure and pushed the mold open slightly, or mold edges are worn out.",
    suggested_action:
      "Increase mold clamp force, lower injection and packing pressure, and inspect mold edges for gaps.",
  },
  {
    id: "flow",
    name: "Flow",
    description: "Wavy circular ripples or flow lines on the gear surface.",
    possible_cause:
      "Melted plastic cooled down too quickly while entering the mold, or injection speed was too slow.",
    suggested_action:
      "Increase mold and plastic melt temperatures, and increase injection fill speed.",
  },
  {
    id: "hair",
    name: "Hair",
    description: "Fine, hair-like plastic threads or fibers stuck to the part.",
    possible_cause:
      "Hot melted plastic drooled from the nozzle tip when the mold opened, leaving thin plastic threads.",
    suggested_action:
      "Lower the nozzle temperature and increase screw suck-back (decompression) so plastic does not drip.",
  },
  {
    id: "missing",
    name: "Missing",
    description: "A missing gear tooth, boss, or incomplete section of the part.",
    possible_cause:
      "Not enough plastic was injected into the mold, or a small mold pin/tooth insert broke off.",
    suggested_action:
      "Check the mold cavity for broken pins or teeth, and increase the plastic shot size.",
  },
  {
    id: "overflow",
    name: "Overflow",
    description: "Excess plastic overflowing heavily outside the mold shape.",
    possible_cause:
      "Too much plastic was forced into the mold cavity, causing extra plastic to spill out of the edges.",
    suggested_action:
      "Reduce shot size and holding pressure, and ensure the mold is closing tightly.",
  },
  {
    id: "perforation",
    name: "Perforation",
    description: "Unwanted small hole or puncture through the plastic wall.",
    possible_cause:
      "Trapped air bubble prevented plastic from joining together, or a core pin poked an unwanted hole.",
    suggested_action:
      "Dry the plastic material before molding, improve mold air venting, and slow down initial injection speed.",
  },
  {
    id: "reverse",
    name: "Reverse",
    description: "Part or insert placed backwards or in the wrong direction.",
    possible_cause:
      "A metal insert or part was placed into the mold backwards or upside down by mistake.",
    suggested_action:
      "Add guide pins so parts only fit the right way, and double-check part orientation before molding.",
  },
  {
    id: "shortshot",
    name: "Shortshot",
    description: "Incomplete part where plastic stopped before filling the teeth or rim.",
    possible_cause:
      "The mold did not fill completely because plastic was too cold or injection pressure was too low.",
    suggested_action:
      "Increase injection pressure and speed, raise plastic melt temperature, and increase shot amount.",
  },
  {
    id: "void",
    name: "Void",
    description: "Hollow bubble inside the plastic or sunken dent on the surface.",
    possible_cause:
      "Plastic shrank inside thick areas as it cooled because holding pressure was too low or stopped too early.",
    suggested_action:
      "Increase holding pressure and hold time, and allow extra cooling time before opening the mold.",
  },
  {
    id: "white",
    name: "White",
    description: "White stretch marks or stress marks left by ejector pins.",
    possible_cause:
      "Ejection pins pushed too hard against the plastic while demolding, leaving white stress marks.",
    suggested_action:
      "Polish the mold walls, reduce ejection speed, and allow more cooling time so the part becomes stiff.",
  },
];

/**
 * Look up defect data by name (case-insensitive).
 * Returns the matching record or undefined.
 */
export function getDefectInfo(name) {
  if (!name) return undefined;
  return DEFECT_CLASSES.find(
    (d) => d.id.toLowerCase() === name.toLowerCase() ||
           d.name.toLowerCase() === name.toLowerCase()
  );
}
