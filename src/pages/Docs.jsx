import { useState } from 'react'
import { ChevronRight, Book, Terminal, Puzzle, Zap, FileText, ChevronDown } from 'lucide-react'

const sections = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    icon: Book,
    items: ['Overview', 'Quick Start', 'Architecture'],
  },
  {
    id: 'vess-app',
    label: 'Vess App Setup',
    icon: Terminal,
    items: ['Installation', 'Configuration', 'SIM Requirements', 'Test Schedules'],
  },
  {
    id: 'configuration',
    label: 'Configuration',
    icon: FileText,
    items: ['Device Registration', 'Test Suites', 'Schedules', 'Environments'],
  },
  {
    id: 'test-types',
    label: 'Test Types',
    icon: Zap,
    items: ['Voice Call Tests', 'SMS Delivery Tests', 'Data Connectivity Tests', 'KPI Reference'],
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: Puzzle,
    items: ['Slack', 'Prometheus', 'Grafana', 'PagerDuty', 'REST API', 'Webhooks'],
  },
  {
    id: 'api',
    label: 'API Reference',
    icon: FileText,
    items: ['Authentication', 'Devices', 'Tests', 'Results', 'Commands'],
  },
]

function CodeBlock({ code }) {
  return (
    <pre className="bg-[#030912] text-slate-100 rounded-xl p-5 overflow-x-auto text-sm leading-relaxed font-mono my-4">
      {code.trim()}
    </pre>
  )
}

function EndpointRow({ method, path, desc }) {
  const methodColors = {
    GET:    'bg-emerald-50 text-emerald-700 border-emerald-200',
    POST:   'bg-blue-50 text-[#1b619f] border-[#c8dff5]',
    PUT:    'bg-amber-50 text-amber-700 border-amber-200',
    DELETE: 'bg-red-50 text-red-600 border-red-200',
  }
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-50 last:border-0">
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border flex-shrink-0 mt-0.5 ${methodColors[method] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
        {method}
      </span>
      <code className="text-sm font-mono text-slate-800 flex-shrink-0">{path}</code>
      <span className="text-xs text-slate-500 leading-relaxed">{desc}</span>
    </div>
  )
}

function DocsContent() {
  return (
    <div className="prose prose-slate max-w-none">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Quick Start</h1>
      <p className="text-slate-600 leading-relaxed">
        Get VeSS running across your network in under 30 minutes. VeSS is an end-to-end platform consisting
        of three components: the <strong>Vess App</strong> (Android testing agent deployed on real devices),
        the <strong>Vess Backend</strong> (results store, command queue, and REST API), and the{' '}
        <strong>Vess Dashboard</strong> (real-time KPI portal for MNO teams).
      </p>

      <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3 pb-2 border-b border-slate-100">
        1. Provision Your Android Devices
      </h2>
      <p className="text-slate-600 text-sm mb-2">
        VeSS requires Android 8.0+ devices with active SIM cards from the operator(s) you are testing.
        Devices should be provisioned with the Vess App APK:
      </p>
      <CodeBlock code={`# Download the Vess App APK from your VeSS dashboard
# Settings → Device Management → Download APK

# Install via ADB (for bulk provisioning):
adb install -r vess-app-latest.apk

# Or enrol via MDM (recommended for large deployments)
# Supported MDMs: Jamf, Intune, VMware Workspace ONE`} />

      <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3 pb-2 border-b border-slate-100">
        2. Register Each Device
      </h2>
      <p className="text-slate-600 text-sm mb-2">
        On first launch, the Vess App calls the registration endpoint with a device fingerprint
        and SIM metadata. You can also pre-register devices via the API:
      </p>
      <CodeBlock code={`POST /api/v1/devices/register

{
  "device_id": "vess-device-metro-001",
  "imei": "35xxxxxxxxxxxxxx",
  "model": "Samsung Galaxy A05",
  "android_version": "13",
  "sim_operator": "Meridian",
  "sim_iccid": "89234xxxxxxxxxxxxxxx",
  "region": "Metro Central",
  "location_label": "City Centre Office"
}`} />

      <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3 pb-2 border-b border-slate-100">
        3. Configure Test Schedules
      </h2>
      <p className="text-slate-600 text-sm mb-2">
        Test schedules are defined in the Vess Dashboard under <strong>Tests → New Test</strong> and pushed
        to devices automatically via the command queue. Example API call:
      </p>
      <CodeBlock code={`POST /api/v1/tests

{
  "name": "Metro Voice CCR Test",
  "type": "voice",
  "target_number": "+1 555 000 0001",
  "schedule": "*/30 * * * *",
  "device_filter": {
    "region": "Metro Central",
    "operator": "Meridian"
  },
  "kpis": ["ccr", "asr", "call_setup_time", "call_drop_rate"]
}`} />

      <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3 pb-2 border-b border-slate-100">
        4. View Results in Real Time
      </h2>
      <p className="text-slate-600 text-sm leading-relaxed">
        Results stream from devices to the VeSS backend within 5 seconds of test completion.
        Access them via the dashboard at{' '}
        <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[#1b619f] font-mono text-xs">https://app.vess-solutions.com</code>,
        the REST API, or your configured integrations (Slack, Prometheus, Grafana, etc.).
      </p>

      <div className="mt-8 bg-[#f0f6ff] border border-[#c8dff5] rounded-xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#1b619f] flex items-center justify-center flex-shrink-0">
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-[#1b619f] mb-1">Next steps</h4>
            <ul className="text-sm text-slate-600 space-y-1.5 mt-2">
              <li className="flex items-center gap-2"><ChevronRight size={13} className="text-[#1b619f]" /> Configure SMS and Data test suites</li>
              <li className="flex items-center gap-2"><ChevronRight size={13} className="text-[#1b619f]" /> Set up Slack or Prometheus integration</li>
              <li className="flex items-center gap-2"><ChevronRight size={13} className="text-[#1b619f]" /> Define per-region KPI alert thresholds</li>
              <li className="flex items-center gap-2"><ChevronRight size={13} className="text-[#1b619f]" /> Explore the full REST API reference below</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── API Reference ── */}
      <h1 className="text-3xl font-extrabold text-slate-900 mt-16 mb-2">API Reference</h1>
      <p className="text-slate-600 leading-relaxed">
        The VeSS REST API uses Bearer token authentication. Obtain your API key from the dashboard under
        <strong> Settings → API Keys</strong>. All requests must include:
      </p>
      <CodeBlock code={`Authorization: Bearer <your_api_key>
Content-Type: application/json`} />

      {/* Device Endpoints */}
      <h2 className="text-xl font-bold text-slate-800 mt-10 mb-1 pb-2 border-b border-slate-100">
        Devices
      </h2>
      <p className="text-slate-500 text-sm mb-4">Manage the Android testing agents deployed across your network.</p>
      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
        <EndpointRow method="POST" path="/api/v1/devices/register"       desc="Register a new Android testing device with device fingerprint and SIM metadata." />
        <EndpointRow method="GET"  path="/api/v1/devices"                desc="List all registered devices. Supports filtering by state, operator, and status." />
        <EndpointRow method="GET"  path="/api/v1/devices/{id}"           desc="Retrieve a single device record including current status and last heartbeat timestamp." />
        <EndpointRow method="PUT"  path="/api/v1/devices/{id}"           desc="Update device metadata such as location label, state assignment, or active flag." />
        <EndpointRow method="DELETE" path="/api/v1/devices/{id}"         desc="Decommission and remove a device from the platform. Retains historical test data." />
        <EndpointRow method="POST" path="/api/v1/devices/{id}/heartbeat" desc="Device heartbeat endpoint called by the Vess App every 60 seconds to confirm liveness." />
      </div>

      <CodeBlock code={`# Example: List all online devices in North Region
GET /api/v1/devices?region=north&status=online

# Response
{
  "devices": [
    {
      "id": "vess-device-north-001",
      "region": "North Region",
      "operator": "Nexar",
      "status": "online",
      "last_heartbeat": "2026-03-29T11:42:00Z",
      "tests_today": 48
    }
  ],
  "total": 1
}`} />

      {/* Test Endpoints */}
      <h2 className="text-xl font-bold text-slate-800 mt-10 mb-1 pb-2 border-b border-slate-100">
        Tests
      </h2>
      <p className="text-slate-500 text-sm mb-4">Define and manage test configurations that are pushed to devices via the command queue.</p>
      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
        <EndpointRow method="POST"   path="/api/v1/tests"                desc="Create a new test definition. Specify type (voice/sms/data), schedule, target, and device filter." />
        <EndpointRow method="GET"    path="/api/v1/tests"                desc="List all test definitions. Filter by type, state, or active status." />
        <EndpointRow method="GET"    path="/api/v1/tests/{id}"           desc="Retrieve a specific test definition including its schedule and associated device filter." />
        <EndpointRow method="PUT"    path="/api/v1/tests/{id}"           desc="Update a test definition. Changes are propagated to devices on their next command poll." />
        <EndpointRow method="DELETE" path="/api/v1/tests/{id}"           desc="Delete a test definition. Active executions in progress are completed before removal." />
        <EndpointRow method="POST"   path="/api/v1/tests/{id}/execute"   desc="Trigger an immediate out-of-schedule test execution on all matching devices." />
      </div>

      <CodeBlock code={`# Example: Create a data throughput test for Metro region devices
POST /api/v1/tests

{
  "name": "Metro Data Throughput",
  "type": "data",
  "schedule": "0 * * * *",
  "device_filter": { "region": "Metro Central" },
  "config": {
    "test_server": "speedtest.vess-solutions.com",
    "duration_seconds": 30,
    "kpis": ["download_mbps", "upload_mbps", "latency_ms", "packet_loss", "jitter_ms", "dns_ms"]
  }
}`} />

      {/* Results Endpoints */}
      <h2 className="text-xl font-bold text-slate-800 mt-10 mb-1 pb-2 border-b border-slate-100">
        Results
      </h2>
      <p className="text-slate-500 text-sm mb-4">Query test results and aggregated KPI data submitted by the Vess App from devices in the field.</p>
      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
        <EndpointRow method="POST" path="/api/v1/results"               desc="Submit test result from a device. Called internally by the Vess App — typically not used directly." />
        <EndpointRow method="GET"  path="/api/v1/results"               desc="Query raw test results. Filter by device, test ID, state, time range, and pass/fail status." />
        <EndpointRow method="GET"  path="/api/v1/results/aggregate"     desc="Retrieve aggregated KPI summaries (CCR, ASR, DR, throughput averages) by state, operator, or time period." />
      </div>

      <CodeBlock code={`# Example: Get aggregated CCR by region for the past 7 days
GET /api/v1/results/aggregate?kpi=ccr&group_by=region&from=2026-03-22&to=2026-03-29

# Response
{
  "kpi": "ccr",
  "period": { "from": "2026-03-22", "to": "2026-03-29" },
  "data": [
    { "region": "Metro Central", "value": 98.7, "sample_count": 4820 },
    { "region": "North Region",  "value": 97.9, "sample_count": 3210 },
    { "region": "East Coast",    "value": 96.4, "sample_count": 2870 },
    { "region": "West District", "value": 95.1, "sample_count": 1940 }
  ]
}`} />

      {/* Device Commands Endpoints */}
      <h2 className="text-xl font-bold text-slate-800 mt-10 mb-1 pb-2 border-b border-slate-100">
        Device Commands
      </h2>
      <p className="text-slate-500 text-sm mb-4">
        The command queue allows the backend to push instructions to devices. The Vess App polls for pending
        commands and acknowledges completion.
      </p>
      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
        <EndpointRow method="GET"  path="/api/v1/devices/{id}/commands"                       desc="Poll for pending commands for a specific device. Called by the Vess App on a 60-second interval." />
        <EndpointRow method="POST" path="/api/v1/devices/{id}/commands/{commandId}/ack"       desc="Acknowledge command completion. The Vess App calls this after successfully executing a pushed command." />
      </div>

      <CodeBlock code={`# Command polling response (called by Vess App)
GET /api/v1/devices/vess-device-metro-004/commands

{
  "commands": [
    {
      "id": "cmd_01j9xyz",
      "type": "run_test",
      "payload": {
        "test_id": "test_voice_metro_01",
        "immediate": true
      },
      "created_at": "2026-03-29T12:00:00Z"
    }
  ]
}

# Acknowledge command
POST /api/v1/devices/vess-device-metro-004/commands/cmd_01j9xyz/ack

{
  "status": "completed",
  "completed_at": "2026-03-29T12:00:04Z"
}`} />

    </div>
  )
}

export default function Docs() {
  const [activeSection, setActiveSection] = useState('getting-started')
  const [openSections, setOpenSections] = useState({ 'getting-started': true })

  const toggle = (id) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }))
    setActiveSection(id)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Docs header */}
      <div className="bg-gradient-to-br from-white via-[#f8fbff] to-[#f0f6ff] border-b border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="section-tag mb-4"><img src="/vess-icon.svg" className="h-3.5 w-auto" aria-hidden="true" />Documentation</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-3">VeSS Documentation</h1>
          <p className="text-slate-500 mt-2 max-w-lg">
            Everything you need to deploy, configure, and operate VeSS across your network.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-10">
          {/* Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              {sections.map(({ id, label, icon: Icon, items }) => (
                <div key={id} className="mb-1">
                  <button
                    onClick={() => toggle(id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                      activeSection === id
                        ? 'bg-[#f0f6ff] text-[#1b619f]'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={15} />
                      {label}
                    </div>
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${openSections[id] ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openSections[id] && (
                    <div className="ml-7 mt-1 space-y-0.5">
                      {items.map(item => (
                        <button
                          key={item}
                          className="w-full text-left text-xs text-slate-500 hover:text-[#1b619f] py-1.5 px-2 rounded transition-colors"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0 max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
              <span>Docs</span>
              <ChevronRight size={12} />
              <span>Getting Started</span>
              <ChevronRight size={12} />
              <span className="text-[#1b619f] font-medium">Quick Start</span>
            </div>

            <DocsContent />

            {/* Prev / Next */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between">
              <div />
              <button className="flex items-center gap-2 text-sm font-medium text-[#1b619f] hover:gap-3 transition-all">
                Vess App Setup <ChevronRight size={15} />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
