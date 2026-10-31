import { NextResponse } from 'next/server';
import { GitHubService } from '@/lib/github-service';

export async function POST(req: Request) {
  try {
    const { token, action, owner, repo } = await req.json();
    const gh = new GitHubService(token);

    if (action === 'verify') {
      const res = await gh.verifyToken();
      return NextResponse.json(res);
    }

    if (action === 'repositories') {
      const repos = await gh.getUserRepositories();
      return NextResponse.json({ success: true, repositories: repos });
    }

    if (action === 'commits' && owner && repo) {
      const commits = await gh.getRepoCommits(owner, repo);
      return NextResponse.json({ success: true, commits });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}
