'use client';

import React from 'react';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { WorkflowCanvas } from '@/components/workflow/WorkflowCanvas';

export default function WorkflowBuilderPage() {
  return (
    <ConsoleLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <WorkflowCanvas />
      </div>
    </ConsoleLayout>
  );
}
