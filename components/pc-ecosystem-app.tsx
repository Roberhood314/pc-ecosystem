"use client";

import { useCallback, useState } from "react";
import { PceProvider, usePce } from "@/contexts/pce-context";
import { AccountScreen } from "./pce/account-screen";
import { AuditScreen } from "./pce/audit-screen";
import { BottomNav, type TabId } from "./pce/bottom-nav";
import { DashboardScreen } from "./pce/dashboard-screen";
import { HealthScreen } from "./pce/health-screen";
import { ModuleDetail } from "./pce/module-detail";
import { LoadingScreen, StorageNotice, ToastHost } from "./pce/pieces";

export function PcEcosystemApp() { return <PceProvider><Shell /></PceProvider>; }

function Shell() {
  const { ready } = usePce();
  const [tab, setTab] = useState<TabId>("home");
  const [detailId, setDetailId] = useState<string | null>(null);
  const [storageOpen, setStorageOpen] = useState(false);
  const changeTab = useCallback((t: TabId) => { setTab(t); window.scrollTo({ top: 0 }); }, []);
  const closeDetail = useCallback(() => setDetailId(null), []);
  if (!ready) return <LoadingScreen />;
  return (
    <div className="min-h-dvh bg-background">
      <main key={tab} className="pce-fade-up mx-auto max-w-md pb-24">
        {tab === "home" && <DashboardScreen onOpen={setDetailId} />}
        {tab === "health" && <HealthScreen onOpen={setDetailId} />}
        {tab === "audit" && <AuditScreen />}
        {tab === "account" && <AccountScreen storageOpen={storageOpen} setStorageOpen={setStorageOpen} />}
      </main>
      <BottomNav tab={tab} onChange={changeTab} />
      {detailId && <ModuleDetail id={detailId} onClose={closeDetail} />}
      <StorageNotice onManage={() => { setDetailId(null); setTab("account"); setStorageOpen(true); }} />
      <ToastHost />
    </div>
  );
}
