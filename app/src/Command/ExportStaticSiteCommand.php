<?php

namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\HttpKernelInterface;

#[AsCommand(
    name: 'app:export-static',
    description: 'Exports the website as static files for GitHub Pages.',
)]
final class ExportStaticSiteCommand extends Command
{
    public function __construct(
        private readonly HttpKernelInterface $httpKernel,
        private readonly Filesystem $filesystem,
        private readonly string $projectDir,
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $docsDir = $this->projectDir.'/docs';
        $publicDir = $this->projectDir.'/public';

        $this->filesystem->remove($docsDir);
        $this->filesystem->mkdir($docsDir);

        $this->filesystem->mkdir($docsDir.'/assets');
        $routes = [
            '/' => 'index.html',
            '/intervenante' => 'intervenante/index.html',
            '/programme' => 'programme/index.html',
            '/billetterie' => 'billetterie/index.html',
            '/statistiques' => 'statistiques/index.html',
            '/a-propos' => 'a-propos/index.html',
            '/vip' => 'vip/index.html',
        ];

        foreach ($routes as $path => $target) {
            $request = Request::create($path);
            $request->server->set('HTTP_HOST', 'example.com');
            $request->server->set('HTTPS', 'on');

            $response = $this->httpKernel->handle($request, HttpKernelInterface::MAIN_REQUEST, false);
            $outputPath = $docsDir.'/'.$target;
            $this->filesystem->mkdir(dirname($outputPath));
            $this->filesystem->dumpFile($outputPath, $response->getContent());
        }

        $this->filesystem->copy($publicDir.'/assets/site.js', $docsDir.'/assets/site.js');
        $this->filesystem->dumpFile($docsDir.'/.nojekyll', '');

        $output->writeln('<info>Static site exported to docs/</info>');

        return Command::SUCCESS;
    }
}
