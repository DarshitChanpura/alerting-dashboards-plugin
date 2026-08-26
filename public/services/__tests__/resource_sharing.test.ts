/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  isResourceSharingAvailable,
  setApplication,
  MONITOR_RESOURCE_TYPE,
  ALERTING_WORKFLOW_RESOURCE_TYPE,
} from '../services';

const setResourceSharing = (resourceSharing?: Record<string, unknown>) =>
  setApplication({ capabilities: resourceSharing ? { resourceSharing } : {} } as any);

describe('isResourceSharingAvailable', () => {
  it('returns false when the resourceSharing capability is absent', () => {
    setResourceSharing();
    expect(isResourceSharingAvailable(MONITOR_RESOURCE_TYPE)).toBe(false);
  });

  it('returns false when resource sharing is disabled', () => {
    setResourceSharing({ enabled: false, availableTypes: 'monitor' });
    expect(isResourceSharingAvailable(MONITOR_RESOURCE_TYPE)).toBe(false);
  });

  it('returns false when the resource type is not in availableTypes', () => {
    setResourceSharing({ enabled: true, availableTypes: 'anomaly-detector,notification_config' });
    expect(isResourceSharingAvailable(MONITOR_RESOURCE_TYPE)).toBe(false);
  });

  it('returns true when enabled and the monitor type is present', () => {
    setResourceSharing({ enabled: true, availableTypes: 'monitor,workflow' });
    expect(isResourceSharingAvailable(MONITOR_RESOURCE_TYPE)).toBe(true);
  });

  it('returns true for the workflow resource type when present', () => {
    setResourceSharing({ enabled: true, availableTypes: 'monitor,workflow' });
    expect(isResourceSharingAvailable(ALERTING_WORKFLOW_RESOURCE_TYPE)).toBe(true);
  });
});
