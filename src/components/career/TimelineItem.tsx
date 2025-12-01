import Image from 'next/image';
import { CompanyMeta } from '@/lib/companies';

type TimelineItemProps = {
  item: CompanyMeta;
  children?: React.ReactNode; // MDX body rendered by parent
};

function formatPeriod(start?: string, end?: string) {
  const fmt = (s?: string) => (s ? new Date(s).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '');
  const startStr = fmt(start);
  const endStr = end ? fmt(end) : 'Present';
  return `${startStr} – ${endStr}`;
}

export default function TimelineItem({ item, children }: TimelineItemProps) {
  return (
    <li className="relative pl-10 pb-10 last:pb-0 focus-within:ring-2 focus-within:ring-blue-500 rounded">
      {/* Vertical line */}
      <span className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" aria-hidden="true" />
      {/* Dot */}
      <span className="absolute left-3 top-1.5 h-3.5 w-3.5 rounded-full bg-blue-600 ring-4 ring-white" aria-hidden="true" />

      <div className="relative">
        <div className="flex items-start gap-4">
          {item.logo ? (
            <div className="h-12 w-12 flex-none overflow-hidden rounded bg-white border border-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.logo} alt="" className="h-full w-full object-contain p-1" />
            </div>
          ) : null}

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.company}
              </h3>
              <span className="text-gray-500">•</span>
              <p className="text-gray-700">{item.role}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {formatPeriod(item.startDate, item.endDate)}{item.location ? ` • ${item.location}` : ''}
            </p>

            {item.technologies && item.technologies.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <span key={tech} className="inline-block rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700 focus:outline-none">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {children ? (
              <div className="prose mt-4 max-w-none">
                {children}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}


