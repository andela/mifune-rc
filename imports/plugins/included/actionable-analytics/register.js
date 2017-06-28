import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "ActionableAnalytics",
  name: "reaction-actionable-analytics",
  icon: "fa fa-bar-chart",
  autoEnable: true,
  settings: {
    name: "ActionableAnalytics"
  },
  registry: [{
    route: "/dashboard/actionable_analytics",
    provides: "dashboard",
    workflow: "coreDashboardWorkflow",
    name: "actionableanalytics",
    label: "Actionable Analytics",
    description: "View Actionable Analytics For Your Shop",
    icon: "fa fa-bar-chart",
    priority: 3,
    container: "core",
    template: "actionableAnalytics"
  },
  {
    route: "/dashboard/performance_analytics",
    name: "performance_analytics",
    provides: "shortcut",
    label: "Performance Analytics",
    description: "View Actionable Analytics For Your Shop",
    icon: "fa fa-pie-chart",
    priority: 3
  }]
});
