function measuredIncrease(before: number, after: number) {
  return { before, after, percent: Number(((after / before - 1) * 100).toFixed(1)) };
}

// Measurements from the public project descriptions, shared by both editions.
export const projectMetrics = {
  tokenFactory: {
    tokensPerMinute: measuredIncrease(93_300_000, 127_500_000),
    peakSessions: measuredIncrease(1_326, 1_880),
    teamThroughputMultiple: 1.89,
  },
  appSharing: { deliveryDays: 2 },
  arm: { prospectiveCustomers: 2, parallelDeliveries: 2, packagingDays: 2 },
  netsPresso: { migrationHours: 2 },
  easyLLM: { minUsers: 70, minModelsServed: 20, activeModels: 8 },
  gpu: {
    minTeams: 10,
    clusters: 3,
    minInstances: 150,
    minAccelerators: 150,
    minModels: 10,
    prototypeDays: 5,
    monthsToProduction: 1,
    monthlyProvisioningOperations: 50,
    weeklySupportHoursBefore: 40,
    weeklySupportHoursAfter: 8,
    supportRequestFreeWeeks: 3,
  },
  transportation: { deploymentTimeReduction: 70 },
  logging: { minClusters: 10, regions: 4 },
  ci: {
    imageGbBefore: 23,
    imageGbAfter: 5,
    averageBuildTimeReduction: 60,
    maxBuildTimeReduction: 90,
    maxPipelineTimeReduction: 80,
    rollbackMinutesBefore: 30,
    rollbackMinutesAfter: 5,
  },
  operationsCli: { weeksSaved: 1 },
  infrastructureAsCode: { monthsBefore: 1, weeksAfter: 1 },
};
